document.addEventListener('DOMContentLoaded', () => {
    const selectCities = document.getElementById('select-cities'),
        defaultList = document.querySelector('.dropdown-lists__list--default'),
        selectList = document.querySelector('.dropdown-lists__list--select'),
        autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
        dropdownCols = document.querySelectorAll('.dropdown-lists__col'),
        url = './db_cities.json';
    let responseData = {};


    const getCities = (url) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send(null);

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if(request.status === 200) {
                responseData = JSON.parse(request.response);
                parseData(responseData.RU, 'default', 3);
            }
        });
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
                if(countCountry) {
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

    selectCities.addEventListener('focus', (event) =>{
        defaultList.style.cssText = 'display: block';
        selectList.style.cssText = 'display: none';
    });

    selectCities.addEventListener('input', (event) => {
        const value = event.target.value;
        let newArr = [];
        responseData.RU.forEach(item => {
            const pattern = new RegExp('^' + value,'i');
            item.cities.forEach(elem => {
                if(elem.name.match(pattern)) {
                    newArr.push(elem);
                }
            });
        });
        parseAutocomplete(newArr);
        defaultList.style.cssText = 'display: none';
        selectList.style.cssText = 'display: none';
        autocompleteList.style.cssText = 'display: block';
    });

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (!event.target.closest('.input-cities')) {
            defaultList.style.cssText = 'display: none';
        }

        if (target.closest('.dropdown-lists__list--default') && target.closest('.dropdown-lists__total-line')) {
            const dataValue = target.closest('.dropdown-lists__total-line').dataset.country;
            let data = responseData.RU;
            data = data.filter((item) => {
                return item.country === dataValue;
            });
            parseData(data, 'select', false);
            defaultList.style.cssText = 'display: none';
            selectList.style.cssText = 'display: block';
            autocompleteList.style.cssText = 'display: none';
        }

        if(target.closest('.dropdown-lists__list--select') && target.closest('.dropdown-lists__total-line')) {
            defaultList.style.cssText = 'display: block';
            selectList.style.cssText = 'display: none';
            autocompleteList.style.cssText = 'display: none';
        }
    });

    getCities(url);

});