document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const start = document.getElementById('start');
    start.setAttribute('disabled', true);
    const plusBtnList = document.getElementsByTagName('button');
    const incomePlus = plusBtnList[0];
    const expensesPlus = plusBtnList[1];
    const valueList = document.querySelectorAll('[class$="value"]');
    const budgetMonthValue = valueList[0];
    const budgetDayValue = valueList[1];
    const expensesMonthValue = valueList[2];
    const additionalIncomeValue = valueList[3];
    const additionalExpensesValue = valueList[4];
    const incomePeriodValue = valueList[5];
    const targetMonthValue = valueList[6];
    const salaryAmount = document.querySelector('.salary-amount');
    const additionalIncomeItem  = document.querySelectorAll('.additional_income-item');
    let expensesItems = document.querySelectorAll('.expenses-items');
    let incomeItems = document.querySelectorAll('.income-items');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    const targetAmount = document.querySelector('.target-amount');
    const periodSelect = document.querySelector('.period-select');
    const periodAmount = document.querySelector('.period-amount');
    const cancelBtn = document.querySelector('#cancel');

    const AppData = function () {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses =[];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    AppData.prototype.reset = function () {
        const allInputs = document.querySelectorAll('input');
        const inputListAll = document.querySelectorAll('input:not(.result-total )');
        const expenseItemsAll = document.querySelectorAll('.expenses-items');
        const incomeItemsAll = document.querySelectorAll('.income-items');

        start.setAttribute('disabled', true);

        allInputs.forEach(function (item) {
            item.value = '';
        });

        inputListAll.forEach(function (item) {
            item.removeAttribute('disabled');
        });
        if(expenseItemsAll.length > 1) {
            expenseItemsAll.forEach(function (item, ind) {
                if(ind > 0) {
                    item.remove();
                }
            });
        }
        expensesPlus.style.display = 'block';

        if(incomeItemsAll.length > 1) {
            incomeItemsAll.forEach(function (item, ind) {
                if(ind > 0) {
                    item.remove();
                }
            });
        }

        periodSelect.value = 0;
        periodAmount.innerHTML = 0;
        incomePlus.style.display = 'block';
        start.style.display = 'block';
        cancelBtn.style.display = 'none';
    };

    AppData.prototype.start = function() {
        const inputList = document.querySelectorAll('input:not(.result-total )');
        inputList.forEach(function (item) {
            item.setAttribute('disabled', true);
        });
        start.style.display = 'none';
        cancelBtn.style.display = 'block';

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getIncomeMonth();
        this.getBudget();
        this.getTargetMonth();
        this.showResult();
    };

    AppData.prototype.showResult = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
    };

    AppData.prototype.addExpensesBlock = function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };

    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };

    AppData.prototype.getIncome = function () {
        const _this = this;
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
        });

    };

    AppData.prototype.getAddExpenses = function () {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };

    AppData.prototype.getAddIncome =function() {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };

    AppData.prototype.getExpensesMonth = function() {
        let sum = 0;

        for(let item in this.expenses) {
            sum += +this.expenses[item];
        }
        this.expensesMonth = sum;
    };

    AppData.prototype.getIncomeMonth = function () {
        let sum = 0;
        for(let item in this.income) {
            sum += +this.income[item];
        }
        this.incomeMonth = sum;
    };

    AppData.prototype.getBudget = function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    };

    AppData.prototype.getTargetMonth = function () {
       return targetAmount.value / this.budgetMonth;
    };

    AppData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };

    AppData.prototype.setRange = function () {
        periodAmount.innerHTML = periodSelect.value;
    };

    AppData.prototype.eventListeners = function() {
        start.addEventListener('click', appData.start.bind(appData));
        cancelBtn.addEventListener('click', appData.reset);
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.setRange);
        salaryAmount.addEventListener('input', function () {
            if(salaryAmount.value !== '') {
                start.removeAttribute('disabled');
            }
        });
    }

    const appData = new AppData();
    appData.eventListeners();

    console.log(appData);

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