<template>
    <div class="mini-widget">

        <h6 class="day-header">
            {{ getDay }}
        </h6>

        <div class="weather-icon">
            <img :src="getImage" :alt="weatherForecast.main" />
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
import { Weather } from "@/models/Weather";
import { slugify } from "@/utils/slugify";

export default defineComponent({
    props: {

        weatherForecast: {
            type: Object as PropType<Weather>,
            required: true
        }
    },
    computed: {
        getImage() {
            let imgSrc = "";
            try {
                imgSrc = require(`../assets/weather-widget-icons/ww-icon-${slugify(this.weatherForecast.main)}.svg`);
            } catch (error) {
                console.error(`Image '../assets/weather-widget-icons/ww-icon-${slugify(this.weatherForecast.main)}.svg' not found!`);
            }
            return imgSrc;
        },
        getDay() {
            return new Date(this.weatherForecast.date * 1000).toLocaleDateString("en", { weekday: "long", });
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


    .solo {
        background: linear-gradient(180deg, #0668C2 0%, #1C0168 100%, rgba(68, 12, 158, 0) 100%), #C4C4C4;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }

    h6 {
        font-size: 15px;
        margin: 0;
        padding: 0;
        text-transform: capitalize;
    }

    .weather-icon {
        width: auto;
        height: 73px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(220deg) brightness(101%) contrast(102%);
        }
    }

    p {
        font-size: 12px;
        margin: 0;
        padding: 0;

        &.max-temp {
            color: #FF0000;
        }

        &.min-temp {
            color: #00FFFF;
        }
    }
}
</style>