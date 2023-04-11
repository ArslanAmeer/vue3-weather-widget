import { DefineComponent } from 'vue';

interface WeatherWidgetProps {
  openWeatherApiKey: string;
}

declare const WeatherWidget: DefineComponent<WeatherWidgetProps>;

export default WeatherWidget;
