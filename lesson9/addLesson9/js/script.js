'use strict';

let time1 = document.querySelector('#time1');

setInterval(function () {
    let day = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    let stringDay = day.toLocaleDateString("ru", options);
    stringDay = stringDay.replace('г.', 'года');
    let arrDay = stringDay.split(' ');
    let arrTime = arrDay[5].split(':');

    arrTime.map(function (elem, ind) {
        if (+elem[0] === 0) {
            arrTime[ind] = elem[1];
        }
    });

    let hour = changeDeclension(arrTime[0], 'час');
    let minutes = changeDeclension(arrTime[1], 'минута');
    let sec = changeDeclension(arrTime[2], 'секунда');
    let newTimeString = hour + ' ' + minutes + ' ' + sec;
    arrDay.splice(5, 6, newTimeString);

    newTimeString = 'Сегодня ' + arrDay.join(' ');

    time1.innerHTML = newTimeString;

    function changeDeclension(number, type) {
        let nameType = [];

        switch (type) {
            case 'час' :
                nameType.push(' час');
                nameType.push(' часа');
                nameType.push(' часов');
                break;
            case 'минута' :
                nameType.push(' минута');
                nameType.push(' минуты');
                nameType.push(' минут');
                break;
            case 'секунда' :
                nameType.push(' секунда');
                nameType.push(' секунды');
                nameType.push(' секунд');
        }

        if (+number === 1 || (+number > 19 && +number[1] === 1)) {
            return number + nameType[0];
        } else if ((+number >= 2 && +number <= 4) || (+number >= 22 && +number <= 24) || (+number[1] >= 2 && +number[1] <= 4)) {
            return number + nameType[1];
        } else {
            return number + nameType[2];
        }
    }
},1000);


