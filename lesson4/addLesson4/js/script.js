'use strict'

let strTrim = function(str) {

    if(typeof(str) === 'string') {
        str = str.trim();
    } else {
        console.log('Надо ввести строку');
    }

    if(str.length > 30) {
        str = str.slice(0,30) + "...";
    }

    return str;
}

let newStr = strTrim('Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев');
console.log(newStr);