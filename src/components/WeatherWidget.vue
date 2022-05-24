<template>
  <div class="widget-wrap">

    <div class="current-weather">

      <div class="weather-icon">
        <img src="@/assets/weather-widget-icons/ww-icon-clear-sky-night.svg" alt="weather-icon">
      </div>

      <div class="weather-detail">

        <h2>Barcelona, Spain</h2>
        <h3>19°C</h3>

        <div class="weather-description">
          <p>Humidity: 50%</p>
          <p>UVI: 0.58</p>
          <p>Wind: NW 3kmh</p>
        </div>

      </div>
    </div>

    <div class="mini-forecast-widget-wrapper">
      <MiniForecastWidget v-for="(obj, index) in weather" :weatherForecast="obj" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Weather } from "@/models/Weather";
import { defineComponent } from "vue";
import MiniForecastWidget from "./MiniForecastWidget.vue";

export default defineComponent({
  setup() {

    // TODO: Dummy data : remove
    const weather: Weather[] = [{
      main: "Rain",
      date: 1611566255,
      humidity: 0,
      maxTemperature: 16,
      minTemperature: 3,
      temperature: 12,
      uvi: 0,
      windDeg: 0,
      windSpeed: 0,
    }, {
      main: "snow",
      date: 1611662400,
      humidity: 0,
      maxTemperature: 10,
      minTemperature: 6,
      temperature: 12,
      uvi: 2,
      windDeg: 54,
      windSpeed: 24,
    }, {
      main: "Thunderstorm",
      date: 1611748800,
      humidity: 42,
      maxTemperature: 10,
      minTemperature: 6,
      temperature: 12,
      uvi: 2,
      windDeg: 54,
      windSpeed: 24,
    }, {
      main: "Snow",
      date: 1611662400,
      humidity: 0,
      maxTemperature: 10,
      minTemperature: 6,
      temperature: 12,
      uvi: 2,
      windDeg: 54,
      windSpeed: 24,
    }, {
      main: "snow",
      date: 1612008000,
      humidity: 0,
      maxTemperature: 10,
      minTemperature: 6,
      temperature: 12,
      uvi: 2,
      windDeg: 54,
      windSpeed: 24,
    }, {
      main: "snow",
      date: 1612180800,
      humidity: 0,
      maxTemperature: 10,
      minTemperature: 6,
      temperature: 12,
      uvi: 2,
      windDeg: 54,
      windSpeed: 24,
    }]

    return { weather };
  },
  components: {
    MiniForecastWidget
  },
});
</script>

<style lang="scss" scoped>
.widget-wrap {
  width: 632px;
  max-width: 900px;
  background: linear-gradient(180deg, #0668C2 0%, #1C0168 100%, rgba(68, 12, 158, 0) 100%), #C4C4C4;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px 30px;
  box-sizing: border-box;

  .current-weather {
    display: flex;
    align-items: center;
    margin-bottom: 28px;

    .weather-icon {
      width: 117px;
      height: 117px;


      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(220deg) brightness(101%) contrast(102%);

      }
    }

    .weather-detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 25px;

      h2 {
        font-size: 25px;
        margin: 0;
        padding: 0;
      }

      h3 {
        font-size: 20px;
        margin: 5px 0;
        padding: 0;
      }

      .weather-description {
        p {
          margin: 0;
          padding: 0;
          margin-bottom: 5px;
        }
      }
    }
  }

  .mini-forecast-widget-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
</style>

