
'use strict';

function bot(x, tryCount) {
    let number = prompt('Угадай число от 1 до 100');

    return function(count) {
        if(number === null){
            return;
        }else {
            count++;
            if(tryCount > count){
                if(+number > x) {
                    count++;
                    alert('Загаданное число меньше, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start(count);
                } else if (+number < x) {
                    alert('Загаданное число больше, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start(count);
                } else if(isNaN(+number)){
                    alert('Введите число, осталось ' + (tryCount - count) + 'попыток');
                    let start = bot(x,tryCount);
                    start(count);
                } else if (+number === x) {
                    alert('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                    start(0);
                }
            } else {
                if(confirm('Попытки закончились, хотите сыграть еще?')){
                    let start = bot(40,5);
                    start(0);
                }else {
                    return;
                }
                
            }
        }
    }
}

let start = bot(40,5);
start(0);