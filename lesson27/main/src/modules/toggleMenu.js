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

export default toggleMenu;