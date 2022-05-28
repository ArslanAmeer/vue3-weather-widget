<template>
    <div class="mini-widget" :title="weatherForecast.weatherDescription">

        <h6 class="day-header">
            {{ getDay }}
        </h6>

        <div class="weather-icon">
            <img :src="getImage" :alt="weatherForecast.weatherMain" />
        </div>

        <p class="max-temp">
            {{ weatherForecast.maxTemperature }}°C
        </p>

        <p class="min-temp">
            {{ weatherForecast.minTemperature }}°C
        </p>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { WeatherSummary } from "@/models/Weather";
import { getIconPath } from "@/utils/fetch-weather-icon"

export default defineComponent({
    props: {

        weatherForecast: {
            type: Object as PropType<WeatherSummary>,
            required: true
        }
    },
    computed: {
        getImage() {
            return getIconPath(this.weatherForecast.weatherId, this.weatherForecast.weatherMain, this.weatherForecast.weatherIcon);
        },
        getDay() {
            const currentDay = new Date().toLocaleDateString("en", { weekday: "long" });
            const forecastDay = new Date(this.weatherForecast.date * 1000).toLocaleDateString("en", { weekday: "long", });
            if (currentDay === forecastDay) {
                return "Today";
            }
            return forecastDay;
        }
    }
});
</script>


<style lang="scss" scoped>
.mini-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 50px;
    max-width: 50px;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.4s ease;

    @media screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        max-width: 100%;
        width: 100%;
        margin-bottom: 20px;
    }


    .solo {
        @include linear-gradient-background;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }

    h6 {
        @include reset;
        font-size: 15px;
        text-transform: capitalize;

        @media screen and (min-width:300px)and(max-width: 768px) {
            width: 50px;
        }
    }

    .weather-icon {
        width: auto;
        height: 73px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
            filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(220deg) brightness(101%) contrast(102%);
        }

        @media screen and (max-width: 768px) {
            width: 50px;
            height: 50px;

        }
    }

    p {
        font-size: 12px;
        margin: 0;
        padding: 0;

        &.max-temp {
            color: #FF0000;
            margin-bottom: 4px;

            @media screen and (max-width: 768px) {
                margin-bottom: 0;
            }
        }

        &.min-temp {
            color: #00FFFF;
        }
    }
}
</style>