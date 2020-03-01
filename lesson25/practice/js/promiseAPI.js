const output = document.getElementById('output');

const getData = (url, outputData) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('redystatechange', () => {
        if(request.readyState !==4) {
            return;
        }
        if(request.status === 200) {
            const response = JSON.parse(request.responseText);
            outputData(response);
        } else {
            console.error(request.statusText);
        }
    });
    request.send();
};

getData('https://jsonplaceholder.typicode.com/photos', (data) => {
    console.log(data);
});