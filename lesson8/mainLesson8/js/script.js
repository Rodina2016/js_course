let money;

function start() {
    money = myPrompt('Ваш месячный доход', 45000, 'number');
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
        console.log(appData.income);
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
appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц:', appData.expenses);
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


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

console.log('Наша программа включает в себя данные:');
for(item in appData) {
    console.log(item, ':', appData[item]);
};

appData.getInfoDeposit();

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());