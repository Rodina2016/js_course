document.addEventListener('DOMContentLoaded', () => {
    const heroesItem = document.querySelector('.heroes__item'),
        heroesBlock = document.getElementById('heroes'),
        preloader = document.getElementById('preloader'),
        filterBlock = document.getElementById('filter');
        cloneItem = heroesItem.cloneNode(true);

    let responseData = {};

    heroesItem.remove();

    getData = () => {
        const request = new XMLHttpRequest();
        request.open('GET', 'dbHeroes.json');
        request.send(null);

        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if(request.status === 200) {
                responseData = eval(request.responseText);
                showData(responseData);
                showFilter(getAllFilms(responseData));
            }
        });
    }

    getAllFilms = (data) => {
        let allFilmsArr = [];
        data.forEach(item => {
            if(item.movies) {
                allFilmsArr = [...allFilmsArr, ...item.movies];
            }
        });
        allFilmsArr = allFilmsArr.filter((item, index) => index === allFilmsArr.indexOf(item));
        return allFilmsArr;
    }

    showFilter = (data) => {
        data.forEach(item => {
            const filterItem = document.createElement('div');
            filterItem.classList.add('filter__item');
            filterItem.textContent = `#${item}`;
            filterItem.setAttribute('data-name', item);
            filterBlock.appendChild(filterItem);
        });
       filterBlock.classList.add('show');
    }

    showData = (data) => {
        if(document.querySelector('.row')) {
            document.querySelector('.row').remove();
        }
        const row = document.createElement('div');
        row.classList.add('row');
        data.forEach(item => {
            const cloneElem = cloneItem.cloneNode(true);
            cloneElem.querySelector('.heroes__item-pseudoname').textContent = item.name;
            cloneElem.querySelector('.heroes__item-realname').textContent = item.realName;
            cloneElem.querySelector('.heroes__item-status').textContent = item.status;
            if(item.status === 'alive') {
                cloneElem.querySelector('.heroes__item-status').classList.add('heroes__item-status--alive');
            }
            cloneElem.querySelector('.heroes__actor-name').textContent = item.actors;
            cloneElem.querySelector('.heroes__item-img').setAttribute('src', item.photo);

            /*films*/
            const filmList = cloneElem.querySelector('.heroes__films-list');
            const filmsItemClone = cloneElem.querySelector('.heroes__films-item').cloneNode();
            cloneElem.querySelector('.heroes__films-item').remove();
            if(item.movies) {
                item.movies.forEach(film => {
                    const cloneFilm = filmsItemClone.cloneNode();
                    cloneFilm.textContent = film;
                    filmList.appendChild(cloneFilm);
                });
            } else {
                filmList.remove();
            }
            row.appendChild(cloneElem);
        });
        preloader.remove();
        heroesBlock.appendChild(row);
    };

    const filterCards = (data, filter) => {
        if(filter === 'all') {
            return data;
        }
        data = data.filter((item, index) => {
            if(item.movies) {
                return item.movies.indexOf(filter) !==-1;
            }
        });
        return data;
    }

    filterBlock.addEventListener('click', (event) => {
        const allFilters = filterBlock.querySelectorAll('.filter__item');
        allFilters.forEach(item => item.classList.remove('active'));
        let newData = {};
        const target = event.target;
        if(target.matches('.filter__item')) {
            target.classList.add('active');
           const film = target.dataset.name;
           newData = filterCards(responseData, film);
        }
        showData(newData);
    })

    getData();
})