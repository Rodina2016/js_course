let money;

function start() {
    do {
        money = prompt('Ваш месячный доход');
    } while (!letIsNumber(money));
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        this.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        this.addExpenses = this.addExpenses.toLowerCase().split(',');
    },
    getExpensesMonth: function() {
        let sum = 0;
        let howMuch = 0;
        let expensesRes = '';
    
        for(let i =0; i < 2; i++) {
    
            expensesRes = prompt('Введите обязательную статью расходов?');
            howMuch = prompt('Во сколько это обойдется?');

            this.expenses[expensesRes] = howMuch;
            while(!letIsNumber(howMuch)) {
                howMuch = prompt('Во сколько это обойдется?');
            }
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
    }
}
appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц:', appData.expenses);
appData.getTargetMonth();
appData.getBudget();
appData.getStatusIncome();


function letIsNumber(n) {
    return !isNaN(parseFloat(n))  && isFinite(n);
}

console.log('Наша программа включает в себя данные:');
for(item in appData) {
    console.log(item, ':', appData[item]);
}