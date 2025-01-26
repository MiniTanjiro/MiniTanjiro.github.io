document.getElementById('decimal').addEventListener('input', (event) => {
    const input = event.target.value;

    const sanitizedInput = input.replace(/[^0-9.]/g, '');

    const parts = sanitizedInput.split('.');
    if (parts.length > 2) {
        event.target.value = parts[0] + '.' + parts[1];
    } else {
        event.target.value = sanitizedInput;
    }
});

document.getElementById('binaire').addEventListener('input', (event) => {
    const input = event.target.value;

    const sanitizedInput = input.replace(/[^01]/g, '');
    event.target.value = sanitizedInput;
});

function convertToBinary() {
    const decimalInput = document.getElementById('decimal').value;

    document.getElementById('binaire').value = '';

    if (decimalInput !== '' && !isNaN(decimalInput) && decimalInput.indexOf(',') === -1) {
        const decimalValue = parseFloat(decimalInput); 
        const integerPart = Math.floor(decimalValue); 
        const fractionalPart = decimalValue - integerPart;  

        let binaryInteger = integerPart.toString(2);

        let binaryFraction = '';
        let count = 0;
        while (fractionalPart !== 0 && count < 10) {
            fractionalPart *= 2;
            const bit = Math.floor(fractionalPart);
            binaryFraction += bit;
            fractionalPart -= bit;
            count++;
        }

        const binaryValue = binaryInteger + (binaryFraction ? '.' + binaryFraction : '');
        document.getElementById('binaire').value = binaryValue;

        resultContainer.innerHTML = binaryValue;
        resultContainer.classList.add('active');
    }
}

function convertToDecimal() {
    const binaryInput = document.getElementById('binaire').value;
    const resultContainer = document.getElementById('result-container');

    document.getElementById('decimal').value = '';

    if (binaryInput !== '' && /^[01]+(\.[01]+)?$/.test(binaryInput)) {
        const [integerPartBin, fractionalPartBin] = binaryInput.split('.');

        const integerValue = parseInt(integerPartBin, 2);

        let fractionalValue = 0;
        if (fractionalPartBin) {
            for (let i = 0; i < fractionalPartBin.length; i++) {
                fractionalValue += parseInt(fractionalPartBin[i]) * Math.pow(2, -(i + 1));
            }
        }

        const decimalValue = integerValue + fractionalValue;
        document.getElementById('decimal').value = decimalValue;

        resultContainer.innerHTML = decimalValue;
        resultContainer.classList.add('active');
    }
}
