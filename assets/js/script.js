document.addEventListener('DOMContentLoaded', function() {
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');
    const applyRgbButton = document.getElementById('apply-rgb');
    const colorPicker = document.getElementById('color-picker');
    const colorDisplay = document.getElementById('color-display');
    const hexCode = document.getElementById('hex-code');

    let isLoading = true;

    function updateColor() {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);

        redValue.textContent = red;
        greenValue.textContent = green;
        blueValue.textContent = blue;
        redInput.value = red;
        greenInput.value = green;
        blueInput.value = blue;

        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        colorDisplay.style.backgroundColor = rgbColor;

        const hex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
        hexCode.textContent = hex;
        colorPicker.value = hex;

        if (!isLoading) {
            saveColorToLocalStorage(red, green, blue);
        }
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function applyRgbFromInputs() {
        const red = Math.min(255, Math.max(0, parseInt(redInput.value) || 0));
        const green = Math.min(255, Math.max(0, parseInt(greenInput.value) || 0));
        const blue = Math.min(255, Math.max(0, parseInt(blueInput.value) || 0));

        redSlider.value = red;
        greenSlider.value = green;
        blueSlider.value = blue;

        updateColor();
    }

    function applyColorFromPicker() {
        const hex = colorPicker.value;
        const rgb = hexToRgb(hex);
        if (rgb) {
            redSlider.value = rgb.r;
            greenSlider.value = rgb.g;
            blueSlider.value = rgb.b;
            updateColor();
        }
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);
    applyRgbButton.addEventListener('click', applyRgbFromInputs);
    colorPicker.addEventListener('input', applyColorFromPicker);

    // Load saved color or initialize with default values
    const savedColor = loadColorFromLocalStorage();
    if (savedColor) {
        redSlider.value = savedColor.red;
        greenSlider.value = savedColor.green;
        blueSlider.value = savedColor.blue;
    }
    updateColor();
    isLoading = false;
});
