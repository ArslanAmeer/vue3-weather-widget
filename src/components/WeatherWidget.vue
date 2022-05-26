<template>
  <div class="widget-wrap">

    <div class="current-weather" v-if="currentWeather !== null && currentWeather != undefined">

      <div class="weather-icon">
        <img src="@/assets/weather-widget-icons/ww-icon-clear-sky-night.svg" alt="weather-icon">
      </div>

      <div class="weather-detail">

        <h2>{{ currentWeather.city }}, {{ currentWeather.country }}</h2>
        <h3>{{ currentWeather.temperature }}°C</h3>

        <div class="weather-description">
          <p>Humidity: {{ currentWeather.humidity }}%</p>
          <p>UVI: {{ currentWeather.uvi }}</p>
          <p>Wind: {{ windDir }} {{ currentWeather.windSpeed }}kmh</p>
        </div>

      </div>
    </div>

    <div class="mini-forecast-widget-wrapper">
      <MiniForecastWidget v-for="(obj, index) in weatherData" :weatherForecast="obj" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Weather } from "@/models/Weather";
import { computed, defineComponent, onMounted, ref } from "vue";
import MiniForecastWidget from "./MiniForecastWidget.vue";
import { windDirection } from "@/utils/wind-direction"
import { mpsToKph } from "@/utils/speed-converters"

export default defineComponent({
  setup() {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lon=2.159&lat=41.3888&units=metric&exclude=minutely,hourly&appid=4a9232de37b1880944eb4e365aa69011`;
    // const geoCodeAPI = `http://api.openweathermap.org/geo/1.0/reverse?lon=2.159&lat=41.3888&limit=1&appid=4a9232de37b1880944eb4e365aa69011`;


    let dummyData: Weather = {
      city: "barcelona",
      country: "spain",
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    };

    const currentWeather = ref<Weather>(dummyData);
    const show = ref(false);

    onMounted(() => {
      getResponse();
    });



    // TODO: Dummy data : remove
    let weatherData: Weather[] = [{
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Rain",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }, {
      weatherMain: "Snow",
      weatherDescription: "Rain with snow",
      temperature: 2,
      maxTemperature: 8,
      minTemperature: 1,
      date: 1611662400,
      humidity: 0,
      uvi: 2,
      windSpeed: 34,
      windDeg: 70,
    }]


    const getResponse = async () => {

      const response = await fetch(weatherAPI);
      const resp = await response.json();
      const mappedData: Weather = {
        city: 'barcelona',
        country: 'spain',
        weatherMain: resp.current.weather[0].main,
        weatherDescription: resp.current.weather[0].description,
        temperature: resp.current.temp,
        date: resp.current.dt,
        humidity: resp.current.humidity,
        uvi: resp.current.uvi,
        windSpeed: resp.current.wind_speed,
        windDeg: resp.current.wind_deg,
      }
      currentWeather.value = mappedData;
      show.value = false;
    }


    const windDir = computed(() => windDirection(dummyData.windDeg));
    const speed = computed(() => mpsToKph(dummyData.windSpeed))

    return { dummyData, weatherData, windDir, speed, show, currentWeather };
  },
  components: {
    MiniForecastWidget
  }
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
        text-transform: capitalize;
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

