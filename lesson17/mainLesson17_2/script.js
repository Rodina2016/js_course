document.addEventListener('DOMContentLoaded', function () {
    const currentHours = new Date().getHours();
    let strHello = 'Доброе утро';
    const dateNow = new Date().getTime();
    const dateNY = new Date('1 january 2021').getTime();
    let counDayToNY = Math.floor((dateNY - dateNow) / 1000 / 86400);

    if(currentHours > 0 && currentHours < 5) {
        strHello = 'Доброй ночи';
    } else if(currentHours >= 5 && currentHours <= 12) {
        strHello = 'Доброе утро';
    } else if(currentHours > 12 && currentHours < 17) {
        strHello = 'Добрый день';
    } else {
        strHello = 'Добрый вечер';
    }

    const days = {
        '1' : 'Понедельник',
        '2' : 'Вторник',
        '3' : 'Среда',
        '4' : 'Четверг',
        '5' : 'Пятница',
        '6' : 'Суббота',
        '7' : 'Воскресение',
    }

    let currentDay = new Date().getDay();
    currentDay = days[currentDay];

    let currentTime = new Date().toLocaleString("en-US").split(',')[1];

    const readyStr = `${strHello} <br>
            Сегодня: ${currentDay} <br>
            Текущее время: ${currentTime} <br>
            До нового года осталось ${counDayToNY} дней`;

    document.body.innerHTML = readyStr;

});