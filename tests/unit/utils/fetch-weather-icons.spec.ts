import { getIconPath } from '@/utils/fetch-weather-icon';

describe('Get Icon Path', () => {
	test('Return should be clear-sky-day', () => {
		expect(getIconPath(800, 'Clear', '01d')).toContain('clear-sky-day');
	});
});
