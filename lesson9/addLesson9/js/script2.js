'use strict';

let time2 = document.querySelector('#time2');

(function(){
    setInterval(function () {
        let day = new Date();

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        let stringDay = day.toLocaleDateString("ru", options).split(',');
        let newTimeString = addZero(stringDay[0], '.') + ' -' + addZero(stringDay[1], ':');

        time2.innerHTML = newTimeString;

        function addZero(string, delimiter) {
            let splitString = string.split(delimiter);
            let newArr = [];
            splitString.map(function (item, ind) {
                if(item.length === 1) {
                    newArr.push('0' + item);
                } else {
                    newArr.push(item);
                }
            });
            return newArr.join(delimiter);
        }
    },1000);
}());

