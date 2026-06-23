function convertTemperature() {

    const tempInput = document.getElementById("temperature").value.trim();
    const unit = document.getElementById("unit").value;

    const error = document.getElementById("error");

    const celsiusResult = document.getElementById("celsiusResult");
    const fahrenheitResult = document.getElementById("fahrenheitResult");
    const kelvinResult = document.getElementById("kelvinResult");

    error.textContent = "";

    if (tempInput === "" || isNaN(tempInput)) {
        error.textContent = "Please enter a valid numeric temperature.";
        return;
    }

    let value = parseFloat(tempInput);

    let celsius;
    let fahrenheit;
    let kelvin;

    if (unit === "celsius") {

        if (value < -273.15) {
            error.textContent =
                "Temperature cannot be below absolute zero (-273.15°C).";
            return;
        }

        celsius = value;
        fahrenheit = (value * 9 / 5) + 32;
        kelvin = value + 273.15;

    }

    else if (unit === "fahrenheit") {

        if (value < -459.67) {
            error.textContent =
                "Temperature cannot be below absolute zero (-459.67°F).";
            return;
        }

        celsius = (value - 32) * 5 / 9;
        fahrenheit = value;
        kelvin = celsius + 273.15;

    }

    else {

        if (value < 0) {
            error.textContent =
                "Temperature cannot be below absolute zero (0 K).";
            return;
        }

        celsius = value - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
        kelvin = value;

    }

    celsiusResult.textContent =
        `${celsius.toFixed(2)} °C`;

    fahrenheitResult.textContent =
        `${fahrenheit.toFixed(2)} °F`;

    kelvinResult.textContent =
        `${kelvin.toFixed(2)} K`;
}
