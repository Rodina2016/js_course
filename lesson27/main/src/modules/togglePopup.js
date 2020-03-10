//Popup

const togglePopup = () => {
    const popup = document.querySelector('.popup');
    const popupContent = document.querySelector('.popup-content');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    let winWidth = document.documentElement.clientWidth;
    window.addEventListener('resize', () => {
         winWidth = document.documentElement.clientWidth;
    });

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
};

export default togglePopup;