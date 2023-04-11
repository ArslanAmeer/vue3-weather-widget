// index.js
import WeatherWidget from './src/components/WeatherWidget.vue';

const plugin = {
    install: (app, options) => {
        app.component('WeatherWidget', {
            ...WeatherWidget,
            props: {
                ...WeatherWidget.props,
                openWeatherApiKey: {
                    type: String,
                    default: options.apiKey,
                },
            },
        });
    },
};

export default plugin;

