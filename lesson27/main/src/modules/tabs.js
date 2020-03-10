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

export default tabs;