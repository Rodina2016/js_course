let money,
income = 'фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 150000;

let expenses = [];

function getExpensesMonth() {
    let sum = 0;
    let howMuch = 0;

    for(let i =0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        howMuch = prompt('Во сколько это обойдется?');
        while(!letIsNumber(howMuch)) {
            howMuch = prompt('Во сколько это обойдется?');
        }
        sum += +howMuch;

    }

    console.log(sum);
    return sum;
}

let getExpensesAmount = getExpensesMonth();
console.log('getExpensesAmount', getExpensesAmount);

function start() {
    do {
        money = prompt('Ваш месячный доход');
    } while (!letIsNumber(money));
}

start();

(function showTypeOf() {
    console.log(typeof(money));
    console.log(typeof(income));
    console.log(typeof(deposit));
}());

let str = addExpenses.toLowerCase();
addExpenses = str.split(',');
console.log(addExpenses);

function getAccumulatedMonth() {
    return money - getExpensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
let budgetDay =  Math.floor(accumulatedMonth/30);
console.log('budgetDay: ', budgetDay);

if(budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
    console.log('Что-то пошло не так');
}

function getTargetMonth() {
    console.log('money', money);
    let month =  Math.ceil(mission/(money - getExpensesAmount));
    if(month > 0) {
        console.log(`За ${month} месяцев вы достигните свое цели`);
    } else {
        console.log(`Цель не будет достигнута...`);
    }
}

getTargetMonth();

function getStatusIncome() {
    console.log(income);
}

getStatusIncome();

function letIsNumber(n) {
    return !isNaN(parseFloat(n))  && isFinite(n);
}
