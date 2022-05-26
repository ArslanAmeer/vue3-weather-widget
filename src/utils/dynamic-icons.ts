/**
 * Standardizing Custom Weather Icons
 * Mapping icon with multiple weather codes and return standard icon when calling the 'getWeatherIconName' function
 */

// List of Custom objects having Weather id, main and icon code. Details on https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

const weatherIcons = [
	{
		id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
		main: 'thunderstorm',
		icon: '11d,11n',
		wwIcon: 'thunderstorm',
	},
	{
		id: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504],
		main: 'rain',
		icon: '10d',
		wwIcon: 'rain-shower-day',
	},
	{
		id: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504],
		main: 'rain',
		icon: '10n',
		wwIcon: 'rain-shower-night',
	},
	{
		id: [511],
		main: 'rain',
		icon: '10n,10d',
		wwIcon: 'hail',
	},
	{
		id: [511, 520, 521, 522, 531],
		main: 'rain',
		icon: '10n,10d',
		wwIcon: 'rain',
	},
	{
		id: [600, 601, 602, 611, 612, 613, 620, 621, 622],
		main: 'snow',
		icon: '13d',
		wwIcon: 'snow',
	},
	{
		id: [615, 616],
		main: 'snow',
		icon: '13d',
		wwIcon: 'hail',
	},
	{
		id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
		main: 'mist,smoke,haze,dust,fog,sand,dust,ash,squall,tornado',
		icon: '50d',
		wwIcon: 'cloud-fog',
	},
	{
		id: [800],
		main: 'clear',
		icon: '01d',
		wwIcon: 'clear-sky-day',
	},
	{
		id: [800],
		main: 'clear',
		icon: '01n',
		wwIcon: 'clear-sky-night',
	},
	{
		id: [801],
		main: 'clouds',
		icon: '02d',
		wwIcon: 'few-clouds-day',
	},
	{
		id: [801],
		main: 'clouds',
		icon: '02n',
		wwIcon: 'few-clouds-night',
	},
	{
		id: [802, 803, 804],
		main: 'clouds',
		icon: '03d,03n,04d,04n',
		wwIcon: 'scattered-clouds',
	},
];

/**
 *
 *  A function that takes a weather condition and returns the corresponding icon
 * @param {number} id
 * @param {string} main
 * @param {string} icon
 * @returns {string}
 * @example
 * getWeatherIconName(200, 'thunderstorm', '11d,11n')
 * => 'thunderstorm'
 *
 * This custom function first check if id matches with any of the weather id in the weatherIcons array.
 * If it matches, it will check if weather main matches,
 * If it matches, it will check if weather icon matches,
 * If it matches, it will return the custom weather icon name (value of 'wwIcon' property),
 * Otherwise it will return the empty string.
 *
 */

export function getWeatherIconName(id: number, main: string, icon: string): string {
	let iconName = '';
	weatherIcons.forEach((element) => {
		if (element.id.includes(id)) {
			if (element.main.includes(main.toLowerCase())) {
				if (element.icon.includes(icon)) {
					iconName = element.wwIcon;
				}
			}
		}
	});

	return iconName;
}
