'use strict';

function bot(x) {
    let number = prompt('Угадай число от 1 до 100');
    return function() {
        if(number === null){
            return;
        }else {
            if(+number > x) {
                alert('Загаданное число меньше');
                let start = bot(x);
                start();
            } else if (+number < x) {
                alert('Загаданное число больше');
                let start = bot(x);
                start();
            } else if(isNaN(+number)){
                alert('Введи число!');
                let start = bot(x);
                start();
            } else if (+number === x) {
                alert('Верно');
            }
        }
    }
}

let x = Math.floor(Math.random()*100);
let start = bot(x);
start();