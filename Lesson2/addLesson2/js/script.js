let num = 266219;
let res = 1;
let strLenght = String(num).length;

for(let i = 1; i <= strLenght; i++) {
    res = res * i;
}

console.log(res);

function pow(x, n) {
    let result = x;
  
    for (let i = 1; i < n; i++) {
      result *= x;
    }
  
    return result;
  }

res = String(pow(res, 3));

console.log(res.substr(0, 2));