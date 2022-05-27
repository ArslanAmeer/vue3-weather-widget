<template>
  <Transition appear name="fade">
    <div class="widget-wrap" v-if="location.city">

      <span @click="updateWeather" class="icon-reload"></span>

      <!-- Current weather status -->
      <div class="current-weather">

        <div class="weather-icon">
          <!-- Using object tag to render Animated SVG. Custom animation using https://www.svgator.com/  -->
          <object type="image/svg+xml" :data="weatherIcon"></object>
        </div>

        <div class="weather-detail">

          <h2>{{ location.city }}, {{ location.country }}</h2>
          <h3>{{ temperature }}°C</h3>

          <div class="weather-description">
            <p>Humidity: {{ currentWeather.humidity }}%</p>
            <p>UVI: {{ currentWeather.uvi }}</p>
            <p>Wind: {{ windDir }} {{ windSpeed }}kmh</p>
          </div>

        </div>
      </div>
      <!-- Next Five days weather forecast -->
      <Transition name="slide-fade">
        <div v-if="weatherData != [] && weatherData.length > 0" class="mini-forecast-widget-wrapper">
          <MiniForecastWidget v-for="(obj, index) in weatherData" :weatherForecast="obj" :key="index" />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts">
// Built-in Imports
import { computed, defineComponent, onMounted, ref } from "vue";

// 3rd Party Import
import { useLoading } from 'vue-loading-overlay'

// Component Import
import MiniForecastWidget from "./MiniForecastWidget.vue";

// Custom Utils and Models Imports
import { Weather, WeatherSummary } from "@/models/Weather";
import { windDirection } from "@/utils/wind-direction";
import { getCountryByCode } from "@/utils/countries-list";
import { getIconPath } from "@/utils/fetch-weather-icon"

export default defineComponent({
  setup(props) {
    const $loading = useLoading();


    const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lon=${props.lon}&lat=${props.lat}&units=metric&exclude=minutely,hourly&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const geoCodeAPI = `http://api.openweathermap.org/geo/1.0/reverse?lon=${props.lon}&lat=${props.lat}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`;

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
    const location = ref<{ city: string, country: string }>({
      city: "",
      country: "-",
    });

    // Fetching location with latitude and longitude
    const reverseGeocode = async () => {
      await fetch(geoCodeAPI)
        .then(res => res.json())
        .then(res => {
          const country = getCountryByCode(res[0].country);
          currentWeather.value.country = country;
          location.value = {
            city: res[0].name,
            country: country,
          };
        });
    };

    // Fetches weather data from the Open Weather API
    const fetchWeatherForecast = async () => {
      const loader = $loading.show({
        color: '#0668C2',
      });
      const response = await fetch(weatherAPI);
      const resp = await response.json();

      // Manually mapping response to our model
      const mappedData: Weather = {
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
        const mappedDailyForecastData: WeatherSummary = {
          weatherMain: obj.weather[0].main,
          weatherId: obj.weather[0].id,
          weatherDescription: obj.weather[0].description,
          weatherIcon: obj.weather[0].icon,
          date: obj.dt,
          maxTemperature: Math.round(obj.temp.max),
          minTemperature: Math.round(obj.temp.min),
        }

        mappedDailyForecast.push(mappedDailyForecastData);
      });

      // Update forecast data with next five days only
      weatherData.value = mappedDailyForecast.slice(0, 6);

      loader.hide();



    }

    onMounted(() => {
      reverseGeocode();
      fetchWeatherForecast();
    });

    const updateWeather = async () => {
      await fetchWeatherForecast();
    };


    const windDir = computed(() => windDirection(currentWeather.value.windDeg)); // Computing wind direction by invoking custom 'windDirection' util function
    const country = computed(() => getCountryByCode(currentWeather.value.country)); // Computing country by invoking custom 'getCountryByCode' util function
    const temperature = computed(() => Math.round(currentWeather.value.temperature)); // Round Temperature to nearest integer
    const windSpeed = computed(() => Math.round(currentWeather.value.windSpeed)); // Round Wind speed to nearest integer
    const weatherIcon = computed(() => getIconPath(currentWeather.value.weatherId, currentWeather.value.weatherMain, currentWeather.value.weatherIcon)); // Get weather icon by invoking custom 'getWeatherIcon' util function

    return { location, weatherData, windDir, currentWeather, country, temperature, windSpeed, weatherIcon, updateWeather };
  },
  components: {
    MiniForecastWidget
  },
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
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
  position: relative;

  @media screen and (max-width: 768px) {
    width: 375px;
    max-width: 632px;
  }

  .icon-reload {
    position: absolute;
    top: -30px;
    right: 10px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    background-image: url('https://cdn-icons.flaticon.com/png/512/1549/premium/1549456.png?token=exp=1653632607~hmac=a69080133a3304413da2d576df30c46d');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(220deg) brightness(101%) contrast(102%);
    transition: all 0.5s ease;
  }

  &:hover {
    .icon-reload {
      top: 10px;
    }
  }

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

        @media screen and (max-width: 768px) {
          font-size: 22px;
        }
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
          font-size: 15px;
        }
      }
    }
  }

  .mini-forecast-widget-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    transition: all 0.4 ease;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
}

// Transition Styling
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 1.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

