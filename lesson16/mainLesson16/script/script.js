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
    const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
    let expensesItems = document.querySelectorAll('.expenses-items');
    let incomeItems = document.querySelectorAll('.income-items');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item');
    const targetAmount = document.querySelector('.target-amount');
    const periodSelect = document.querySelector('.period-select');
    const periodAmount = document.querySelector('.period-amount');
    const cancelBtn = document.querySelector('#cancel');
    const depositCheck = document.querySelector('#deposit-check');
    const depositBank = document.querySelector('.deposit-bank');
    const depositAmount = document.querySelector('.deposit-amount');
    const depositPercent = document.querySelector('.deposit-percent');


    class AppData {
        constructor() {
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.allValid = true;
        }

        reset() {
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

            if (expenseItemsAll.length > 1) {
                expenseItemsAll.forEach(function (item, ind) {
                    if (ind > 0) {
                        item.remove();
                    }
                });
            }
            expensesPlus.style.display = 'block';

            if (incomeItemsAll.length > 1) {
                incomeItemsAll.forEach(function (item, ind) {
                    if (ind > 0) {
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

        start() {
            this.checkOtherPercent();

            if(this.allValid) {
                this.disableInputs();
                this.budget = +salaryAmount.value;
                this.getExpenses();
                this.getIncome();
                this.getAddIncome();
                this.getExpensesMonth();
                this.getAddExpenses();
                this.getIncomeMonth();
                this.getInfoDeposit();
                this.getBudget();
                this.getTargetMonth();
                this.showResult();
            } else {
                alert('Введите корректное значение в поле проценты');
            }
        };

        disableInputs() {
            const inputList = document.querySelectorAll('input:not(.result-total )');
            inputList.forEach(function (item) {
                item.setAttribute('disabled', true);
            });
            start.style.display = 'none';
            cancelBtn.style.display = 'block';
        };

        showResult() {
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

        addExpensesBlock() {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        };

        addIncomeBlock() {
            const cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        };

        getExpenses() {
            const _this = this;
            expensesItems.forEach(function (item) {
                const itemExpenses = item.querySelector('.expenses-title').value;
                const cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        };

        getIncome() {
            const _this = this;
            incomeItems.forEach(function (item) {
                const itemIncome = item.querySelector('.income-title').value;
                const cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') {
                    _this.income[itemIncome] = +cashIncome;
                }
            });

        };

        getAddExpenses() {
            const _this = this;
            const addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    _this.addExpenses.push(item);
                }
            });
        };

        getAddIncome() {
            const _this = this;
            additionalIncomeItem.forEach(function (item) {
                const itemValue = item.value.trim();
                if (itemValue !== '') {
                    _this.addIncome.push(itemValue);
                }
            });
        }

        getExpensesMonth() {
            let sum = 0;

            for (let item in this.expenses) {
                sum += +this.expenses[item];
            }
            this.expensesMonth = sum;
        };

        getIncomeMonth = function () {
            let sum = 0;
            for (let item in this.income) {
                sum += +this.income[item];
            }
            this.incomeMonth = sum;
        };

        getBudget() {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        };

        getTargetMonth() {
            return targetAmount.value / this.budgetMonth;
        };

        calcPeriod() {
            return this.budgetMonth * periodSelect.value;
        };

        setRange() {
            periodAmount.innerHTML = periodSelect.value;
        };

        getInfoDeposit() {
            if(this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        };

        checkOtherPercent() {
            const depositeValue = depositPercent.value;
            if(!letIsNumber(depositeValue) || depositeValue < 0 || depositeValue > 100) {
                this.allValid = false;
            } else {
                this.allValid = true;
            }
        };

        changePercent() {
            const valueSelect = this.value;
           if(valueSelect === 'other') {
               depositPercent.style.display = 'inline-block';
               depositPercent.value = '';
               depositPercent.removeAttribute('disabled');
           } else {
               depositPercent.style.display = 'none';
               depositPercent.value = valueSelect*100;
           }
        };

        depositHandler() {
            if(depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        };

        eventListeners() {
            start.addEventListener('click', appData.start.bind(appData));
            cancelBtn.addEventListener('click', appData.reset);
            expensesPlus.addEventListener('click', appData.addExpensesBlock);
            incomePlus.addEventListener('click', appData.addIncomeBlock);
            periodSelect.addEventListener('input', appData.setRange);
            salaryAmount.addEventListener('input',  () => {
                if (salaryAmount.value !== '') {
                    start.removeAttribute('disabled');
                }
            });
            depositCheck.addEventListener('change', this.depositHandler.bind(this));
        }

    }

    const appData = new AppData();
    appData.eventListeners();

    console.log(appData);

    function letIsNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function myPrompt(text, defaultValue, type) {
        let res;
        let sing = '';

        do {
            res = prompt(text, defaultValue);
        } while (res === '' || (sing = type === 'number' ? !letIsNumber(+res) : letIsNumber(+res)));

        return res;
    }

});