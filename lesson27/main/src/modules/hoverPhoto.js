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

export default hoverPhoto;