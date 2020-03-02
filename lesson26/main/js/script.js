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

    countTimer('2 march 2020');


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

    //calculation

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            animateTotal(total);
        }

        const animateTotal = (total) => {
            for(let i = 0; i <= total; i++) {
                setTimeout(function () {
                    totalValue.textContent = i;
                },1000);
            }
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if(target.matches('.calc-type') || target.matches('.calc-square') ||
                target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
            }
        });
    };

    calc(100);

    //send-ajax-form

    const sendForm = (form, style) => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо, мы скоро свяжемся с вами!';
        const loadMessage = document.createElement('img');
        loadMessage.setAttribute('src', 'images/load.gif');
        loadMessage.style.cssText = 'width:30px;'

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = style;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if(isValid(form) > 0) {
                return;
            }

            form.appendChild(statusMessage);
            statusMessage.appendChild(loadMessage);
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    if(response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    clearForm(form);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });

        const clearForm = (form) => {
            let allInputs =  form.querySelectorAll('input');
            allInputs = [...allInputs];
            allInputs = allInputs.filter((item) => {
                return item.getAttribute('type') !== 'submit';
            });

            allInputs.forEach(item => {
                item.value = '';
            })
        }

        const postData = (body) => {
           return fetch('./server.php',
                {
                    method: 'POST',
                    headers:  {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
        }

        const isValid = (form) =>{
            let errorsCount = 0;
            const patterTel = /^\+?[78]([-()]*\d){10,}$/;
            const patternText = /^[а-яА-ЯёЁ\s]+$/;
            const tel = form.querySelector('[type=tel]');
            const name = form.querySelector('[name=user_name]');
            const message = form.querySelector('[name=user_message]');

            const validInput = (elem, pattern) => {
                const elemValue = elem.value;
                if(!pattern.test(elemValue)) {
                    elem.style.cssText = 'border: 1px solid red';
                    errorsCount++;
                } else {
                    elem.style.cssText = '';
                }
            }

            if(tel) validInput(tel, patterTel);
            if(name) validInput(name, patternText);
            if(message) validInput(message, patternText);

            return errorsCount;
        }
    }

    const allForms = document.querySelectorAll('form');
    allForms.forEach(item => {
        sendForm(item, 'color: white; font-size: 2rem')
    });

})