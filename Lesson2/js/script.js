var money = 60000,
income = 15000,
addExpenses = "проезд, питание, ЖКХ, интернет, телефон",
deposit = true,
mission = 150000,
period = 10;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
let str = addExpenses.toLowerCase();
console.log(str.split(','));

let budgetDay = money/30;
console.log(budgetDay);