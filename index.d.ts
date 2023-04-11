import { DefineComponent } from "vue";
import WeatherWidget from "./src/components/WeatherWidget.vue";

declare const _WeatherWidget: DefineComponent<typeof WeatherWidget>;

export { _WeatherWidget as WeatherWidget };
