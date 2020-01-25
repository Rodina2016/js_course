let num = 266219;
let res = 1;
let strNum = String(num);
let strLenght = strNum.length;

for(let i = 0; i < strLenght; i++) {
    res = res * strNum[i];
}

console.log(res);

res = String(res**3);

console.log(res.substring(0, 2));