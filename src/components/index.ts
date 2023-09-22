import { App, Plugin } from 'vue';
import WeatherWidget from './WeatherWidget.vue';

interface WeatherWidgetPluginOptions {
  openWeatherApiKey: string;
}

const WeatherWidgetPlugin: Plugin = {
  install: (app: App, options?: WeatherWidgetPluginOptions) => {
    app.component(WeatherWidget.name, WeatherWidget);
    if (options && options.openWeatherApiKey) {
      app.provide('openWeatherApiKey', options.openWeatherApiKey);
    }
  },
};

export default WeatherWidgetPlugin;
export { WeatherWidget };
