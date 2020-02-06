document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const start = document.getElementById('start');
    start.setAttribute('disabled', true);
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
    const additionalIncomeItem  = document.querySelectorAll('.additional_income-item');
    const expensesTitle = document.querySelector('.expenses-title');
    let expensesItems = document.querySelectorAll('.expenses-items');
    let incomeItems = document.querySelectorAll('.income-items');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    const targetAmount = document.querySelector('.target-amount');
    const periodSelect = document.querySelector('.period-select');
    const periodAmount = document.querySelector('.period-amount');

    let appData = {
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function() {
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.getTargetMonth();
            appData.getIncomeMonth();
            appData.showResult();
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth + appData.incomeMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', function () {
                incomePeriodValue.value = appData.calcPeriod();
            });
        },
        addExpensesBlock: function() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function (item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                console.log(itemExpenses, cashExpenses);
                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
                console.log('expenses',appData.expenses);
            });
        },
        getIncome: function () {
            incomeItems.forEach(function (item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                console.log(itemIncome, cashIncome);
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = +cashIncome;
                }
            });

        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            console.log(addExpenses);
            addExpenses.forEach(function (item) {
                item = item.trim();
                if(item !== '') {
                    appData.addExpenses.push(item);
                }
            });
            console.log(appData.addExpenses);
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function (item) {
                let itemValue = item.value.trim();
                console.log(itemValue);
                if(itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
            console.log(appData.addIncome);
        },
        getExpensesMonth: function() {
            let sum = 0;

            for(let item in appData.expenses) {
                sum += +appData.expenses[item];
            }
            this.expensesMonth = sum;
        },
        getIncomeMonth: function () {
            let sum = 0;
            for(let item in appData.income) {
                sum += +appData.income[item];
            }
            appData.incomeMonth = sum;
        },
        getBudget: function () {
            console.log(appData.budget);
            console.log(appData.incomeMonth);
            console.log(appData.expensesMonth);
            appData.budgetMonth = appData.budget + (+appData.incomeMonth) - (+appData.expensesMonth);
            appData.budgetDay = Math.floor(appData.budgetMonth/30);
        },
        getTargetMonth: function () {
           return targetAmount.value / appData.budgetMonth;
        },
        calcPeriod: function () {
            return appData.budgetMonth * periodSelect.value;
        },
        setRange: function () {
            periodAmount.innerHTML = periodSelect.value;
        },
    };
    start.addEventListener('click', appData.start);
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.setRange);
    salaryAmount.addEventListener('input', function () {
        if(salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    });

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

});