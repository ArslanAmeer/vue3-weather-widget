import { slugify } from '@/utils/slugify';

export function getIconPath(name: string): string {
	let imgSrc = '';
	try {
		imgSrc = require(`../assets/weather-widget-icons/ww-icon-${slugify(name)}.svg`);
	} catch (error) {
		console.error(`Image '../assets/weather-widget-icons/ww-icon-${slugify(name)}.svg' not found!`);
	}
	return imgSrc;
}
