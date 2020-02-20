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
            main = document.querySelector('main'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        const scrollToSection = (item) => {
            const href = item.getAttribute('href');
            if(href[0] === '#' && href.length > 1) {
                event.preventDefault()
                const targetBlock = document.querySelector(`${href}`);
                targetBlock.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }

        //вызов меню
        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('close-btn') || target.getAttribute('href')) handlerMenu();
            if(target.getAttribute('href')) scrollToSection(target);
        });

        //клик на кнопку вниз на баннере
        main.addEventListener('click', (event) => {
            if(event.target.closest('a') && event.target.closest('a').getAttribute('href')) {
                let target = event.target.closest('a');
                scrollToSection(target);
            }
    });
    }

    toggleMenu();


    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const popupContent = document.querySelector('.popup-content');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const winWidth = document.documentElement.clientWidth;
        popupContent.style.transform = `translate(-300%)`;

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let time = 0;
        popup.style.display = 'block';
        if(winWidth > 768) {
            animate(time);
        } else {
            popupContent.style.transform = `translate(0%)`;
        }
    });
    });

        const animate = (time) => {
            const id = setInterval(() => {
                popupContent.style.transform = `translate(${-300 + time}%)`;
            time = time + 2;
            if(time <= 300) {
                animate();
            } else {
                clearInterval(id);
            }
        });
        };

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        popupContent.style.transform = `translate(-300%)`;
    });
    }

    togglePopup();

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
        tabs = tabHeader.querySelectorAll('.service-header-tab'),
        tabsContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            tabsContent.forEach((item, i) => {
                if(index === i) {
                    tabs[i].classList.add('active');
                    tabsContent[i].classList.remove('d-none');
                } else {
                tabs[i].classList.remove('active');
                tabsContent[i].classList.add('d-none');
            }
            });
        }

    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');

            if(target) {
                tabs.forEach((item, index) => {
                    if(item === target) {
                        toggleTabContent(index);
                    }
                });
            }


    });
    }

    tabs();
})