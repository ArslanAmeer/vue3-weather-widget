import { windDirection } from '@/utils/wind-direction';

describe('Get Wind Direction by passing Degrees', () => {
	test('Return should NW', () => {
		expect(windDirection(315)).toBe('NW');
	});
});
