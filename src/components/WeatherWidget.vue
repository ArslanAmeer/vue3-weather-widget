<template>
  <div class="widget-wrap">
    <MiniForecastWidget v-for="(obj, index) in weather" :weatherForecast="obj" :key="index" />
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
  display: flex;
  justify-content: space-between;
}
</style>

