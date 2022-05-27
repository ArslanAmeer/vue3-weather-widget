import { slugify } from '@/utils/slugify';

describe('Slugify', () => {
	test('Clear Sky should be clear-sky', () => {
		expect(slugify('Clear Sky')).toBe('clear-sky');
	});
});
