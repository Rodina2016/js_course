'use strict';

let arr = ['5465464','2554','7687','45656', "255456"];

for( let i = 0; i < arr.length; i++) {
    if(+arr[i][0] === 2 || +arr[i][0] === 4) {
        console.log(arr[i]);
    }
}

for(let i = 1; i < 100; i++) {
    let k = 0;
    for(let j = 2; j < 100; j++) {
        let ost = i%j;
        if(!ost) {
            k++;
        }
        if(k > 1) {
            break;
        }
    }
    if(k === 1) {
        console.log(`Делители этого числа: 1 и ${i}`);
    }

}
