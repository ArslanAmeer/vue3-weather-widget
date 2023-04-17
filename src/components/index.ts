// src/components/button/index.ts
import { App, Plugin } from 'vue'

import WeatherWidget from './WeatherWidget.vue'

export default {
    install(Vue: App) {
        Vue.component(WeatherWidget.name, WeatherWidget)
    }
} as Plugin

export {
    WeatherWidget as WeatherWidgetComponent
}