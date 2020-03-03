//calculation

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        allCalcInputs = document.querySelectorAll('calcType'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        let squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if(calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }
        animateTotal(total);
    }

    const animateTotal = (total) => {
        for(let i = 0; i <= total; i++) {
            setTimeout(function () {
                totalValue.textContent = i;
            },1000);
        }
    }


    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if(target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
            countSum();
        }
    });

    const validateCalc = () => {
        const inputCalc = document.querySelector('.calc-block').querySelectorAll('input');
        inputCalc.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\W/gi, '');
            });
        });
    }

    validateCalc();
};

export default calc;