import { slugify } from '@/utils/slugify';

/**
 *
 * A function that takes a weather condition and returns the corresponding icon
 *
 * @param {string} name
 * @returns {string}
 * @example
 * getWeatherIcon('clear-day')
 *  => '@/assets/weather-widget-icons/ww-icon-clear-day.svg'
 */
export function getIconPath(name: string): string {
	let imgSrc = '';
	try {
		imgSrc = require(`@/assets/weather-widget-icons/ww-icon-${slugify(name)}.svg`);
	} catch (error) {
		console.error(`Image '@/assets/weather-widget-icons/ww-icon-${slugify(name)}.svg' not found!`);
	}
	return imgSrc;
}
