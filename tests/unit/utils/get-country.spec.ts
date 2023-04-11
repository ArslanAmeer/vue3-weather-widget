import { getCountryByCode } from '../../../src/utils/countries-list';

describe('Get Country Name By Country Code', () => {
	test('Return should be Spain', () => {
		expect(getCountryByCode('ES')).toBe('Spain');
	});
});
