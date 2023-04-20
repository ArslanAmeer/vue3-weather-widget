<template>
    <div class="mini-widget" :title="weatherForecast.weatherDescription">
        <h6 class="day-header">
            {{ getDay }}
        </h6>

        <div class="weather-icon">
            <img :src="getImage" :alt="weatherForecast.weatherMain" />
        </div>

        <p class="max-temp">{{ weatherForecast.maxTemperature }}°C</p>

        <p class="min-temp">{{ weatherForecast.minTemperature }}°C</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherSummary } from "../models/Weather";
import { getIconPath } from "../utils/fetch-weather-icon";

export default defineComponent({
    props: {
        weatherForecast: {
            type: Object as PropType<WeatherSummary>,
            required: true,
        },
    },
    computed: {
        getImage() {
            return getIconPath(
                this.weatherForecast.weatherId,
                this.weatherForecast.weatherMain,
                this.weatherForecast.weatherIcon
            );
        },
        getDay() {
            const currentDay = new Date().toLocaleDateString("en", {
                weekday: "long",
            });
            const forecastDay = new Date(
                this.weatherForecast.date * 1000
            ).toLocaleDateString("en", { weekday: "long" });
            if (currentDay === forecastDay) {
                return "Today";
            }
            return forecastDay;
        },
    },
});
</script>
