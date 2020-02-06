document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const start = document.getElementById('start');
    const plusBtnList = document.getElementsByTagName('button');
    const incomePlus = plusBtnList[0];
    const expensesPlus = plusBtnList[1];
    const checkBox = document.querySelector('#deposit-check');
    const addExpensesItems = document.querySelectorAll('.additional_expenses-item')[0];
    const valueList = document.querySelectorAll('[class$="value"]');
    const budgetMonthValue = valueList[0];
    const budgetDayValue = valueList[1];
    const expensesMonthValue = valueList[2];
    const additionalIncomeValue = valueList[3];
    const additionalExpensesValue = valueList[4];
    const incomePeriodValue = valueList[5];
    const targetMonthValue = valueList[6];
    const salaryAmount = document.querySelector('.salary-amount');
    const incomeTitle = document.querySelector('.income-title');
    const incomeAmount = document.querySelector('.income-amount');
    const additionalIncomeItem1  = document.querySelectorAll('.additional_income-item')[0];
    const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
    const expensesTitle = document.querySelector('.expenses-title');
    const expensesAmount = document.querySelector('.expenses-amount');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    const targetAmount = document.querySelector('.target-amount');
    const periodSelect = document.querySelector('.period-select');

    let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 50000,
        period: 3,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function() {
            if(salaryAmount.value === '') {
                alert('Поле месячный доход должно быть заполнено!');
                return;
            }
            appData.budget = salaryAmount.value;
            console.log(salaryAmount.value);
            // appData.asking();
            // appData.getExpensesMonth();
            // appData.getBudget();
            // appData.getTargetMonth();
            // appData.getStatusIncome();
        },
        addExpensesBlock: function() {
            const expensesItem = document.querySelector('.expenses-items');
            console.log(expensesItem.parentNode);
        },
        asking: function () {
            if(confirm('Есть ли у вас доп. зароботок?')) {
                let ItemIncome = myPrompt('Какой у ваc дополнительный зароботок?', 'Таксую', 'string');
                let cashIncome = myPrompt('Сколько в месяц зарабатываете на этом?', 10000, 'number');

                appData.income[ItemIncome] = cashIncome;
            }
            this.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Свет, газ, вода');
            this.deposit = confirm('Есть ли у вас депозит в банке?');
            this.addExpenses = this.addExpenses.toLowerCase().split(',');
        },
        getExpensesMonth: function() {
            let sum = 0;
            let howMatch = 0;
            let expensesRes = '';

            for(let i =0; i < 2; i++) {
                expensesRes = myPrompt('Введите обязательную статью расходов?', 'Учеба', 'string');
                howMatch = myPrompt('Во сколько это обойдется?', 15000, 'number');
                this.expenses[expensesRes] = howMatch;
            }

            for(item in this.expenses) {
                sum += +this.expenses[item];
            }
            this.expensesMonth = sum;
        },
        getBudget: function () {
            this.budgetMonth = this.budget - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth/30);

            if(this.budgetDay >= 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
                console.log('У вас средний уровень дохода');
            } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
                console.log('К сожалению у вас уровень дохода ниже среднего');
            } else if (this.budgetDay <= 0) {
                console.log('Что-то пошло не так');
            }
        },
        getTargetMonth: function () {
            let month =  Math.ceil(this.mission/(this.budgetMonth));
            if(month > 0) {
                console.log(`За ${month} месяцев вы достигните свое цели`);
            } else {
                console.log(`Цель не будет достигнута...`);
            }
        },
        getStatusIncome : function () {
        },
        getInfoDeposit: function () {
            if(appData.deposit) {

                appData.percentDeposit = myPrompt('Какой годовой процент?','10', 'number');
                appData.moneyDeposit = myPrompt('Какая сумма заложена?',10000, 'number');

            }
        },
        calcSaveMoney: function () {
            return  appData.budgetMonth * appData.period;
        }
    };
    start.addEventListener('click', appData.start);
    expensesPlus.addEventListener('click', appData.addExpensesBlock);

    function letIsNumber(n) {
        return !isNaN(parseFloat(n))  && isFinite(n);
    }

    function myPrompt (text, defaultValue, type) {
        let res;
        let sing = '';

        do {
            res = prompt(text, defaultValue);
        } while(res === '' || (sing = type === 'number' ? !letIsNumber(+res) : letIsNumber(+res)));

        return res;
    }


    appData.getInfoDeposit();

    let addExpensesArr = appData.addExpenses;
    let newArrAddExpreses = [];
    for( item in addExpensesArr) {
        let elem = addExpensesArr[item].trim();
        let firstLetter = elem[0].toUpperCase();
        let newWord = firstLetter + elem.substring(1);
        newArrAddExpreses.push(newWord);
    }

    let newSrting = newArrAddExpreses.join(', ');

    console.log(newSrting);

});