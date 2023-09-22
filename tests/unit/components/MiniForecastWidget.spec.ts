import { shallowMount } from '@vue/test-utils';
import MiniForecastWidget from '../../../src/components/MiniForecastWidget.vue';
import { WeatherSummary } from '../../../src/models/Weather';

describe('WeatherWidget.vue', () => {
	it('renders', async () => {
		const weatherDescription = 'partial cloudy';
		const weather: WeatherSummary = {
			weatherMain: 'Cloudy',
			weatherDescription,
			weatherId: 800,
			weatherIcon: '01d',
			maxTemperature: 10,
			minTemperature: 10,
			date: 1588888888,
		};

		const wrapper = shallowMount(MiniForecastWidget, {
			props: {
				weatherForecast: weather,
			},
		});

		expect(wrapper.find(`[title="${weatherDescription}"]`).text()).toContain('1');
	});
});
