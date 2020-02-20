'use strict';

let booksBlock = document.querySelector('.books');
let bookList = document.querySelectorAll('.book');

booksBlock.appendChild(bookList[1]);
booksBlock.appendChild(bookList[0]);
booksBlock.appendChild(bookList[4]);
booksBlock.appendChild(bookList[3]);
booksBlock.appendChild(bookList[5]);
booksBlock.appendChild(bookList[2]);
document.querySelector('body').style.cssText = 'background-image:url(image/adv.jpg)';
document.querySelector('.books .book:nth-child(3) a').innerHTML = 'Книга 3. this и Прототипы Объектов';
document.querySelector('.adv').remove();

const ulList = document.querySelector('.books .book:nth-child(2) ul');
const li = document.querySelectorAll('.books .book:nth-child(2) ul li');
ulList.appendChild(li[0]);
ulList.appendChild(li[1]);
ulList.appendChild(li[3]);
ulList.appendChild(li[6]);
ulList.appendChild(li[8]);
ulList.appendChild(li[4]);
ulList.appendChild(li[5]);
ulList.appendChild(li[7]);
ulList.appendChild(li[9]);
ulList.appendChild(li[2]);
ulList.appendChild(li[10]);

const ulListBook5 = document.querySelector('.books .book:nth-child(5) ul');
const liBook5 = document.querySelectorAll('.books .book:nth-child(5) ul li');

ulListBook5.appendChild(liBook5[0]);
ulListBook5.appendChild(liBook5[1]);
ulListBook5.appendChild(liBook5[9]);
ulListBook5.appendChild(liBook5[3]);
ulListBook5.appendChild(liBook5[4]);
ulListBook5.appendChild(liBook5[2]);
ulListBook5.appendChild(liBook5[6]);
ulListBook5.appendChild(liBook5[7]);
ulListBook5.appendChild(liBook5[5]);
ulListBook5.appendChild(liBook5[8]);
ulListBook5.appendChild(liBook5[10]);

const newLi = document.createElement('li');
newLi.innerHTML = 'Глава 8: За пределами ES6';
document.querySelector('.books .book:nth-child(6) ul li:nth-child(9)').after(newLi);




