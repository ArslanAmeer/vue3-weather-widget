<template>
  <div class="widget-wrap">

    <!-- Current weather status -->
    <div class="current-weather" v-if="currentWeather !== null && currentWeather != undefined">

      <div class="weather-icon">
        <!-- Using object tag to render Animated SVG. Custom animation using https://www.svgator.com/  -->
        <object type="image/svg+xml" :data="weatherIcon"></object>
      </div>

      <div class="weather-detail">

        <h2>{{ currentWeather.city }}, {{ country }}</h2>
        <h3>{{ temperature }}°C</h3>

        <div class="weather-description">
          <p>Humidity: {{ currentWeather.humidity }}%</p>
          <p>UVI: {{ currentWeather.uvi }}</p>
          <p>Wind: {{ windDir }} {{ windSpeed }}kmh</p>
        </div>

      </div>
    </div>

    <!-- Next Five days weather forecast -->
    <div v-if="weatherData != [] && weatherData.length > 0" class="mini-forecast-widget-wrapper">
      <MiniForecastWidget v-for="(obj, index) in weatherData" :weatherForecast="obj" :key="index" />
    </div>

  </div>
</template>

<script lang="ts">
// Built-in Imports
import { computed, defineComponent, onMounted, ref } from "vue";

// Component Import
import MiniForecastWidget from "./MiniForecastWidget.vue";

// Custom Utils and Models Imports
import { Weather, WeatherSummary } from "@/models/Weather";
import { windDirection } from "@/utils/wind-direction";
import { getCountryByCode } from "@/utils/countries-list";
import { getIconPath } from "@/utils/fetch-weather-icon"

export default defineComponent({
  setup() {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lon=2.159&lat=41.3888&units=metric&exclude=minutely,hourly&appid=4a9232de37b1880944eb4e365aa69011`;
    // const geoCodeAPI = `http://api.openweathermap.org/geo/1.0/reverse?lon=2.159&lat=41.3888&limit=1&appid=4a9232de37b1880944eb4e365aa69011`;

    // TODO: Dummy data | to be removed later
    let dummyData: Weather = {
      city: "---",
      country: "---",
      weatherId: 800,
      weatherMain: "Clear",
      weatherIcon: "01d",
      weatherDescription: "clear",
      temperature: 0,
      date: 0,
      humidity: 0,
      uvi: 0,
      windSpeed: 0,
      windDeg: 0,
    };

    const currentWeather = ref<Weather>(dummyData);
    const weatherData = ref<WeatherSummary[]>([]);

    // Fetches weather data from the Open Weather API
    const getResponse = async () => {
      const response = await fetch(weatherAPI);
      const resp = await response.json();

      // Manually mapping response to our model
      const mappedData: Weather = {
        city: 'barcelona',
        country: 'ES',
        weatherId: resp.current.weather[0].id,
        weatherMain: resp.current.weather[0].main,
        weatherIcon: resp.current.weather[0].icon,
        weatherDescription: resp.current.weather[0].description,
        temperature: resp.current.temp,
        date: resp.current.dt,
        humidity: resp.current.humidity,
        uvi: resp.current.uvi,
        windSpeed: resp.current.wind_speed,
        windDeg: resp.current.wind_deg,
      }

      // Update current weather data
      currentWeather.value = mappedData;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dailyForecastData: any[] = resp.daily;
      const mappedDailyForecast: WeatherSummary[] = [];

      // Manually mapping Daily forecast response array to our custom model array
      dailyForecastData.map((obj) => {
        const mappedData: WeatherSummary = {
          weatherMain: obj.weather[0].main,
          weatherId: obj.weather[0].id,
          weatherDescription: obj.weather[0].description,
          weatherIcon: obj.weather[0].icon,
          date: obj.dt,
          maxTemperature: Math.round(obj.temp.max),
          minTemperature: Math.round(obj.temp.min),
        }

        mappedDailyForecast.push(mappedData);
      });

      // Update forecast data with next five days only
      weatherData.value = mappedDailyForecast.slice(0, 6);

    }

    onMounted(() => {
      getResponse();
    });


    const windDir = computed(() => windDirection(currentWeather.value.windDeg)); // Computing wind direction by invoking custom 'windDirection' util function
    const country = computed(() => getCountryByCode(currentWeather.value.country)); // Computing country by invoking custom 'getCountryByCode' util function
    const temperature = computed(() => Math.round(currentWeather.value.temperature)); // Round Temperature to nearest integer
    const windSpeed = computed(() => Math.round(currentWeather.value.windSpeed)); // Round Wind speed to nearest integer
    const weatherIcon = computed(() => getIconPath(currentWeather.value.weatherId, currentWeather.value.weatherMain, currentWeather.value.weatherIcon)); // Get weather icon by invoking custom 'getWeatherIcon' util function

    return { weatherData, windDir, currentWeather, country, temperature, windSpeed, weatherIcon };
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

      object {
        width: 100%;
        height: 100%;
        // object-fit: contain;
        // object-position: center;
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

