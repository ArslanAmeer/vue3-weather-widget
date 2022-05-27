require('isomorphic-fetch');
import { flushPromises, shallowMount } from '@vue/test-utils';
import WeatherWidget from '@/components/WeatherWidget.vue';

describe('WeatherWidget.vue', () => {
	it('renders', async () => {
		const wrapper = shallowMount(WeatherWidget, {
			props: {
				lat: 41.3888,
				lon: 2.1667,
			},
		});

		await flushPromises();

		expect(wrapper.text()).toMatch('');
	});
});
