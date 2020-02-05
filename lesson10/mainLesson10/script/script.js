'use strict';

let booksBlock = document.querySelector('.books');
let bookList = document.querySelectorAll('.book');
console.log(booksBlock);
booksBlock.appendChild(bookList[1]);
booksBlock.appendChild(bookList[0]);
booksBlock.appendChild(bookList[4]);
booksBlock.appendChild(bookList[3]);
booksBlock.appendChild(bookList[5]);
booksBlock.appendChild(bookList[2]);

document.querySelector('body').style.cssText = 'background-image:url(image/adv.jpg)';
bookList[4].children('a');