export function ToggleUnits() {
    const selectors = ["#feelslike", "#temp"];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(item => {
            const text = item.innerText;
            const temp = parseFloat(text);
            const unit = text.includes("°F") ? "°F" : "°C";
            const isFahrenheit = unit === "°F";
            const newTemp = isFahrenheit
                ? (temp - 32) * 5 / 9
                : temp * 9 / 5 + 32;
            const newUnit = isFahrenheit ? "°C" : "°F";
            item.innerText = `${Math.round(newTemp)}${newUnit}`;
        });
    });
}
