'use strict';
import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
import 'whatwg-fetch';
import appendPolyfill from './polyfill/polyfillAppend';
import FormData from 'formdata-polyfill';
elementClosest(window);
appendPolyfill();
let Promise = require('es6-promise').Promise;

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import hoverPhoto from "./modules/hoverPhoto";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

countTimer('2 march 2020');
toggleMenu();
togglePopup();
tabs();
slider();
hoverPhoto();
calc(100);

const allForms = document.querySelectorAll('form');
allForms.forEach(item => {
    sendForm(item, 'color: white; font-size: 2rem')
});