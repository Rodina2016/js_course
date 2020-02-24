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
                if (number.length < 2) {
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

            if (timer.timeRemaining < 0) {
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
            if (href[0] === '#' && href.length > 1) {
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
            if (target.classList.contains('close-btn') || target.getAttribute('href')) handlerMenu();
            if (target.getAttribute('href')) scrollToSection(target);
        });

        //клик на кнопку вниз на баннере
        main.addEventListener('click', (event) => {
            if (event.target.closest('a') && event.target.closest('a').getAttribute('href')) {
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
                if (winWidth > 768) {
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
                if (time <= 300) {
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
                if (index === i) {
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

            if (target) {
                tabs.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }


        });
    }

    tabs();

    //slider

    const slider = () => {
        const slides = document.querySelectorAll('.portfolio-item'),
            btns = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotsContainer = document.querySelector('.portfolio-dots');

        let currentSlide = 0;
        let interval,
            dots;

        const initDots = () => {
            slides.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dotsContainer.append(dot);
            });

            dots = document.querySelectorAll('.dot');
            dots[0].classList.add('dot-active');
        }

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('#arrow-right, #arrow-left, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((elem, ind) => {
                    if (elem === target) {
                        currentSlide = ind;
                    }
                })
            }

            if(currentSlide >= slides.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
        initDots();
    };

    slider();

    //show photo teams

    const hoverPhoto = () => {
        const command = document.getElementById('command');

        command.addEventListener('mouseover', (event) => {
            changePhoto(event);
        });

        command.addEventListener('mouseout', (event) => {
            changePhoto(event);
        });

        const changePhoto = (event) => {
            const target = event.target;
            if(target.matches('.command__photo')) {
                const dataset = target.dataset.img;
                const src = target.getAttribute('src');
                target.setAttribute('src', target.dataset.img);
                target.setAttribute('data-img', src);
            }
        }
    }

    hoverPhoto();

    //validate calculate

    const validateCalc = () => {
        const inputCalc = document.querySelector('.calc-block').querySelectorAll('input');
        inputCalc.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\W/gi, '');
            });
        });
    }

    validateCalc();
})