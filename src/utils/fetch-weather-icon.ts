import { slugify } from '@/utils/slugify';
import { getWeatherIconName } from '@/utils/dynamic-icons';

/**
 *
 * A function that takes a weather data and returns the corresponding full icon path
 *
 * @param {string} id
 * @param {string} main
 * @param {string} icon
 * @returns {string}
 * @example
 * getWeatherIcon('clear-day')
 *  => '@/assets/weather-widget-icons/ww-icon-clear-day.svg'
 */
export function getIconPath(id: number, main: string, icon: string): string {
	let imgSrc = '';
	try {
		imgSrc = `../assets/weather-widget-icons/ww-icon-${slugify(getWeatherIconName(id, main, icon))}.svg`;
	} catch (error) {
		console.error(
			`Image '@/assets/weather-widget-icons/ww-icon-${slugify(
				getWeatherIconName(id, main, icon)
			)}.svg' not found!`
		);
	}
	return imgSrc;
}
