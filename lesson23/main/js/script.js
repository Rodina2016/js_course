const valid = new Validator({
    selector: '#myForm',
    pattern: {
        phone: /^\+380\d{7}$/
    },
    method: {
        'phone': [
            ['notEmpty'],
            ['pattern', 'phone'],
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email'],
        ]
    },
});

valid.init();