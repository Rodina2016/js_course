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
                console.log(responseData);
            }
        });
    }

    getCities(url);

    console.log(responseData);



    const setData = (data) => {
        return data;
    }

    const parseDataDefault = (data) => {
        const ruArr = data.RU;
        ruArr.forEach(item => {
            const countryBlock = document.createElement('div');
            countryBlock.classList.add('dropdown-lists__countryBlock');
            const totalLine =
                `<div class="dropdown-lists__total-line">
                    <div class="dropdown-lists__country" data-country="${item.country}">${item.country}</div>
                    <div class="dropdown-lists__count">${item.count}</div>
                 </div>`;
            countryBlock.insertAdjacentHTML('beforeend', totalLine);

            item.cities.forEach((city, ind) => {
                if (ind > 2) {
                    return;
                }
                const line =
                `<div class="dropdown-lists__line" data-link="${city.link}">
                    <div class="dropdown-lists__city">${city.name}</div>
                    <div class="dropdown-lists__count">${city.count}</div>
                 </div>`;
                countryBlock.insertAdjacentHTML('beforeend', line);
            });

            dropdownCols[0].insertAdjacentElement('beforeend', countryBlock);
        })
    };

    const parseDataSelect = (data) => {

    }

    const openDefaultList = () => {
        defaultList.style.cssText = 'display: block';
    }

    const hiddenDefaultList = () => {
        defaultList.style.cssText = 'display: none';
    }

    selectCities.addEventListener('focus', (event) =>{
        openDefaultList();
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!event.target.closest('.input-cities')) {
            hiddenDefaultList();
        }

        if (target.matches('.dropdown-lists__country')) {
            const dataValue = target.dataset.country;
            parseDataSelect(dataValue);
        }
    });

});