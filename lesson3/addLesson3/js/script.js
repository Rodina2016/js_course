let lang = prompt('Введите язык');

if(lang === 'ru') {
    console.log('понедельник, вторник, среда, четверг, пятница , суббота, воскресенье');
} else if(lang === 'en') {
    console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}

switch (lang) {
    case 'ru':
        console.log('понедельник, вторник, среда, четверг, пятница , суббота, воскресенье');
        break;
    case 'en':
        console.log('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;
}

let arrLang = {
    'ru':'понедельник, вторник, среда, четверг, пятница , суббота, воскресенье',
    'en': 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
}

console.log(arrLang[lang]);

let namePerson = prompt('Введите имя');

let position = 
namePerson === 'Артем' ? 'директор' :
namePerson ==='Максим' ? 'преподаватель' :
'Студент';

console.log(position);
