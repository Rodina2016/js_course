
'use strict';

function bot(x, tryCount) {
    let number = prompt('Угадай число от 1 до 100');

    return function(count) {
        if(number === null){
            return;
        }else {
            console.log(tryCount);
            console.log(count);
            if(tryCount >= count){
                if(+number > x) {
                    count++;
                    alert('Загаданное число меньше, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start();
                } else if (+number < x) {
                    count++;
                    alert('Загаданное число больше, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start();
                } else if(isNaN(+number)){
                    count++;
                    alert('Введите число, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start();
                } else if (+number === x) {
                    alert('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                    start();
                }
            } else {
                alert('Попытки закончились, хотите сыграть еще?');
                let start = bot(40,5);
                start();
            }
        }
    }
}

let start = bot(40,5);
start();