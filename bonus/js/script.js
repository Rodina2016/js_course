document.addEventListener('DOMContentLoaded', () => {
    const selectCities = document.getElementById('select-cities'),
        defaultList = document.querySelector('.dropdown-lists__list--default'),
        selectList = document.querySelector('.dropdown-lists__list--select'),
        autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
        label = document.querySelector('label'),
        button = document.querySelector('.button'),
        inputCities = document.querySelector('.input-cities'),
        spiner = document.querySelector('.spiner'),
        url = './db_cities.json';
    let lang = 'RU';
    let responseData = {};

    button.removeAttribute('href');

    const askLang = () => {
        if(!getCookie('lang')) {
            do {
                lang = prompt('Укажите язык RU, EN или DE').toLocaleUpperCase();
            } while (lang !== 'RU' && lang !== 'EN' && lang !== 'DE');

            setCookie('lang', lang)
        } else {
            lang = getCookie('lang');
        }
    }

    const setToLocalStorage = (data) => {
        localStorage.setItem('data', JSON.stringify(data));
    }

    const getFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('data'));
    }

    const getData = (url) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send(null);

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                inputCities.style.cssText = 'display: none';
                return;
            } else {
                spiner.style.cssText = 'display: none';
                inputCities.style.cssText = 'display: block';
            }
            if (request.status === 200) {
                responseData = JSON.parse(request.response);
                setToLocalStorage(responseData);
                parseData(responseData[lang], 'default', 3);
            }
        });
    }

    const getCities = (value) => {
        let newData = [];

        getFromLocalStorage()[lang].forEach(item => {
            const pattern = new RegExp('^' + value, 'i');
            item.cities.forEach(elem => {
                if (elem.name.match(pattern)) {
                    newData.push(elem);
                }
            });
        });

        if (!newData.length) {
            newData.push({name: 'Ничего не найдено', count: ''});
        }
        parseAutocomplete(newData);
        defaultList.style.cssText = 'display: none';
        selectList.style.cssText = 'display: none';
        autocompleteList.style.cssText = 'display: block';
        label.style.cssText = 'display: none';
    }

    const parseData = (data, selector, countCountry) => {
        let dropdownCols = document.querySelector(`.dropdown-lists__list--${selector}`);
        dropdownCols = dropdownCols.querySelector('.dropdown-lists__col');
        dropdownCols.innerHTML = '';
        data.forEach(item => {
            const countryBlock = document.createElement('div');
            countryBlock.classList.add('dropdown-lists__countryBlock');
            const totalLine =
                `<div class="dropdown-lists__total-line" data-country="${item.country}">
                    <div class="dropdown-lists__country">${item.country}</div>
                    <div class="dropdown-lists__count">${item.count}</div>
                 </div>`;
            countryBlock.insertAdjacentHTML('beforeend', totalLine);

            item.cities.forEach((city, ind) => {
                if (countCountry) {
                    if (ind >= countCountry) {
                        return;
                    }
                }
                const line =
                    `<div class="dropdown-lists__line" data-link="${city.link}">
                    <div class="dropdown-lists__city">${city.name}</div>
                    <div class="dropdown-lists__count">${city.count}</div>
                 </div>`;
                countryBlock.insertAdjacentHTML('beforeend', line);
            });

            dropdownCols.insertAdjacentElement('beforeend', countryBlock);
        })
    }

    const parseAutocomplete = (data) => {
        let dropdownCols = document.querySelector('.dropdown-lists__list--autocomplete');
        dropdownCols = dropdownCols.querySelector('.dropdown-lists__col');
        dropdownCols.innerHTML = '';
        data.forEach(item => {
            const countryBlock = document.createElement('div');
            countryBlock.classList.add('dropdown-lists__countryBlock');

            const line =
                `<div class="dropdown-lists__line" data-link="${item.link}">
                <div class="dropdown-lists__city">${item.name}</div>
                <div class="dropdown-lists__count">${item.count}</div>
             </div>`;

            countryBlock.insertAdjacentHTML('beforeend', line);
            dropdownCols.insertAdjacentElement('beforeend', countryBlock);
        });

    }

    const animateleft = () => {
        const idInterval = setInterval(() => {
            let currentPos = +selectList.style.left.slice(0, -1);
            if (currentPos <= -33) {
                clearInterval(idInterval); // закончить анимацию через 2 секунды
                return;
            }
            selectList.style.cssText = `display: block; left: ${currentPos - 1}%`;
            defaultList.style.cssText = `display: block; left: ${currentPos - 1}%`;
        },20);
    }

    const animateRight = () => {
        const idInterval = setInterval(() => {
            let currentPos = +selectList.style.left.slice(0, -1);
            if (currentPos >= 0) {
                clearInterval(idInterval); // закончить анимацию через 2 секунды
                return;
            }
            selectList.style.cssText = `display: block; left: ${currentPos + 1}%`;
            defaultList.style.cssText = `display: block; left: ${currentPos + 1}%`;
        },20);
    }

    const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const setCookie = (name, value, options = {}) => {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    selectCities.addEventListener('focus', () => {
        if(!selectList.classList.contains('opened')) {
            defaultList.style.cssText = 'display: block';
            selectList.style.cssText = 'display: none';
            autocompleteList.style.cssText = 'display: none';
            selectList.classList.add('opened');
        }
    });

    selectCities.addEventListener('input', (event) => {
        const value = event.target.value;
        if (value !== '') {
            getCities(value);
        } else {
            defaultList.style.cssText = 'display: block';
            selectList.style.cssText = 'display: none';
            autocompleteList.style.cssText = 'display: none';
            label.style.cssText = 'display: block';
        }
    });

    document.addEventListener('click', (event) => {
        let target = event.target;

        const completeInput = (target) => {
            label.style.cssText = 'display: none';
            selectCities.value = target.textContent;
        }

        if (!event.target.closest('.input-cities')) {
            defaultList.style.cssText = 'display: none';
            selectList.style.cssText = 'display: none';
            autocompleteList.style.cssText = 'display: none';
            selectList.classList.remove('opened');
        }

        if (target.closest('.dropdown-lists__list--default') && target.closest('.dropdown-lists__total-line')) {
            const dataValue = target.closest('.dropdown-lists__total-line').dataset.country;
            let data = getFromLocalStorage()[lang];
            data = data.filter((item) => {
                return item.country === dataValue;
            });
            parseData(data, 'select', false);
            animateleft();
        }

        if (target.closest('.dropdown-lists__list--select') && target.closest('.dropdown-lists__total-line')) {
            animateRight();
        }

        if (target.closest('.dropdown-lists__line')) {
            target = target.closest('.dropdown-lists__line').querySelector('.dropdown-lists__city');
            if (target.textContent !== 'Ничего не найдено') {
                completeInput(target);
            }
            const href = target.closest('.dropdown-lists__line').getAttribute('data-link');
            if (href !== 'undefined') {
                button.setAttribute('href', href);
            }

        } else if (target.closest('.dropdown-lists__total-line')) {
            completeInput(target.closest('.dropdown-lists__total-line').querySelector('.dropdown-lists__country'));
            button.removeAttribute('href');
        }

        if (target.matches('.close-button')) {
            selectCities.value = '';
            autocompleteList.style.cssText = 'display: none';
            label.style.cssText = 'display: block';
            button.removeAttribute('href');
        }
    });

    askLang();
    getData(url);

});