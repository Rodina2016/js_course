document.addEventListener('DOMContentLoaded', function () {
    const key = 'trnsl.1.1.20200302T193843Z.4702ca428879ea57.592ed6d636d01842b9901308016ac9d19db406a2',
        lang = 'en-ru',
        url = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        textEn = document.getElementById('text_en'),
        textRu = document.getElementById('text_ru'),
        sendbtn = document.getElementById('send');

    const postData = (text) => {
        return fetch(`${url}?key=${key}&text=${text}&lang=${lang}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response => response.json());
    }

    sendbtn.addEventListener('click', (event) => {
        const text = textEn.value;
        postData(text)
            .then(data => {
                textRu.value = data.text;
            });
    });

});



