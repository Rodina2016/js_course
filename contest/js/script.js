document.addEventListener('DOMContentLoaded', () => {
    const heroesItem = document.querySelector('.heroes__item'),
        heroesBlock = document.getElementById('heroes'),
        preloader = document.getElementById('preloader'),
        cloneItem = heroesItem.cloneNode(true);

    heroesItem.remove();

    getData = () => {
        const request = new XMLHttpRequest();
        request.open('GET', 'dbHeroes.json');
        request.send(null);

        request.addEventListener('readystatechange', () => {
            console.log(request.readyState);
            if (request.readyState !== 4) {
                return;
            }
            if(request.status === 200) {
                const responseData = eval(request.responseText);
                showData(responseData);
            }
        });
    }

    showData = (data) => {
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

    getData();
})