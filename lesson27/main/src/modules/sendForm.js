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
                console.log(response);
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

export default sendForm;