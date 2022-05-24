/*
    This custom function returns the temperature in Celsius from the temperature in Fahrenheit.
*/
export function fahrenheitToCelsius(fahrenheit: number) {
	return Math.round(((fahrenheit - 32) * 5) / 9);
}

/*
    This custom function returns the temperature in Fahrenheit from the temperature in Celsius.
*/
export function celsiusToFahrenheit(celsius: number) {
	return Math.round((celsius * 9) / 5 + 32);
}
