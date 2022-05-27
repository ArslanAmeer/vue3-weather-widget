require('isomorphic-fetch');
import { shallowMount } from '@vue/test-utils';
import WeatherWidget from '@/components/WeatherWidget.vue';

describe('WeatherWidget.vue', () => {
	it('renders', () => {
		const wrapper = shallowMount(WeatherWidget, {
			// props: {
			// 	lat: 41.3888,
			// 	lon: 2.1667,
			// },
		});
		expect(wrapper.text()).toMatch('');
	});
});
