var money = prompt('Ваш месячный доход'),
income = 'фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = 1*prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = 1*prompt('Во сколько это обойдется?'),
mission = 150000,
period = 10;

(function showTypeOf() {
    console.log(typeof(money));
    console.log(typeof(income));
    console.log(typeof(deposit));
}());

console.log(getExpensesMonth());

let str = addExpenses.toLowerCase();
addExpenses = str.split(',');
console.log(addExpenses);

let accumulatedMonth = getAccumulatedMonth();
getTargetMonth();

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

getStatusIncome();



function getTargetMonth() {
    let month =  Math.ceil(mission/(money - getExpensesMonth()));
    if(month > 0) {
        console.log(`За ${month} месяцев вы достигните свое цели`);
    } else {
        console.log(`Что-то пошло не так...`);
    }
}

function getStatusIncome() {
    console.log(income);
}

function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

function getExpensesMonth() {
    return amount1 + amount2;
}
