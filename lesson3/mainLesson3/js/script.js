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

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
let str = addExpenses.toLowerCase();
addExpenses = str.split(',');
console.log(addExpenses);
let budgetMonth = amount1 + amount2;
let month = Math.ceil(mission/(money - budgetMonth));
let budgetDay =  Math.floor((money - budgetMonth)/30);

console.log('Доход', money);
console.log(expenses1, ': ',  amount1);
console.log(expenses2, ': ',  amount2);
console.log('Всего расходов', budgetMonth);
console.log(`Цель заработать ${mission} рублей`);
console.log('Месячный бюджет ', budgetMonth);
console.log('Бюджет на день', budgetDay);
if(month > 0) {
    console.log(`За ${month} месяцев вы достигните свое цели`);
} else {
    console.log(`Что-то пошло не так...`);
}


if(budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
    console.log('Что-то пошло не так');
}