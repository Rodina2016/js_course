let money;

function start() {
    do {
        money = prompt('Ваш месячный доход', 45000);
    } while (!letIsNumber(money));
}

start();

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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        if(confirm('Есть ли у вас доп. зароботок?')) {
            let ItemIncome = '';
            do{
                ItemIncome = prompt('Какой у ва дополнительный зароботок?', 'Таксую');
            } while (ItemIncome === '' || !isNaN(+ItemIncome));

            let cashIncome = 0;
            do {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
            } while(cashIncome === '' || !letIsNumber(+cashIncome));

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
            do {
                expensesRes = prompt('Введите обязательную статью расходов?', 'Учеба');
            } while (expensesRes === '' || !isNaN(+expensesRes));

            do {
                howMatch = prompt('Во сколько это обойдется?', 15000);
            } while (howMatch === '' || !letIsNumber(+howMatch));

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
        console.log(appData.income);
    },
    getInfoDeposit: function () {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?','10');
            } while (appData.percentDeposit === '' || !letIsNumber(+appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?',10000);
            } while (appData.moneyDeposit === '' || !letIsNumber(+appData.moneyDeposit));
        }
    },
    calcSaveMoney: function () {
       return  appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц:', appData.expenses);
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


function letIsNumber(n) {
    return !isNaN(parseFloat(n))  && isFinite(n);
}

console.log('Наша программа включает в себя данные:');
for(item in appData) {
    console.log(item, ':', appData[item]);
};

appData.getInfoDeposit();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());