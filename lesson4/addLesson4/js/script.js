'use strict'

let strTrim = function(str) {

    if(typeof(str) === 'string') {
        str = str.trim();
        if(str.length > 30) {
            str = str.slice(0,30) + "...";
        }
    } else {
        console.log('Надо ввести строку');
    }

    return str;
}

let newStr = strTrim(30);
console.log(newStr);