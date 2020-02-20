'use strict';

let week = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];

let day = new Date().getDay();
console.log(day);

for (let item in week) {
    console.log(item);
    if(week[item] === 'Суббота' || week[item] === 'Воскресенье') {
        if(+item === day) {
            document.write("<strong><i>"+week[item]+"</i></strong><br>");
        } else {
            document.write("<i>"+week[item]+"</i><br>");
        }
    } else {
        if(+item === day) {
        document.write("<strong>"+week[item]+"</strong><br>");
        } else {
            document.write(week[item]+"<br>");
        }
    }

}