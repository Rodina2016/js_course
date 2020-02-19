document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Таймер
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime();
            const timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60) < 0 ? 0 : Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60) < 0 ? 0 : Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60) < 0 ? 0 : Math.floor(timeRemaining / 60 / 60);

            function formateNumber(number) {
                number = String(number);
                if(number.length < 2) {
                    return '0' + number;
                } else {
                    return number;
                }
            }

            hours = formateNumber(hours);
            minutes = formateNumber(minutes);
            seconds = formateNumber(seconds);

            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if(timer.timeRemaining < 0) {
                clearInterval(idInterval);
            }
        }

        const idInterval = setInterval(updateClock, 1000);
    }

    countTimer('20 february 2020');


    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((item) => {
            item.addEventListener('click', handlerMenu);

            const linkItem = item.querySelector('a');
            linkItem.addEventListener('click', (e) => {
                e.preventDefault();
                const href = linkItem.getAttribute('href');
                const targetBlock = document.querySelector(`${href}`);
                targetBlock.scrollIntoView({
                    behavior: 'smooth',
                });

            });
        });

    }

    toggleMenu();

    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const winWidth = document.documentElement.clientWidth;
        popup.style.transform = `translate(-100%)`;

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let time = 0;
                popup.style.display = 'block';
                if(winWidth > 768) {
                    animate(time);
                } else {
                    popup.style.transform = `translate(0%)`;
                }
            });
        });

        const animate = (time) => {
            const id = setInterval(() => {
                popup.style.transform = `translate(${-100 + time}%)`;
                time = time + 0.5;
                if(time <= 100) {
                    animate();
                } else {
                    clearInterval(id);
                }
            });
        };

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popup.style.transform = `translate(-100%)`;
        });
    }

    togglePopup();

    //


})