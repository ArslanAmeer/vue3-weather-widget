<template>

  <Transition name="fade" v-show="!isLoading">
    <div class="widget-wrap weather"
      :class="{ rain: currentWeather.weatherMain === 'Rain' || rain, snow: currentWeather.weatherMain === 'Snow', overlay: isLoading }"
      v-if="location.city">
      <span title="Toggle Rain Effect" @click="makeItRain" class="icon-rain-drop"></span>
      <span title="Refresh Weather" @click="updateWeather" class="icon-reload"></span>

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
        <div v-if="weatherData.length && weatherData.length > 0" class="mini-forecast-widget-wrapper">
          <MiniForecastWidget v-for="(obj, index) in weatherData" :weatherForecast="obj" :key="index" />
        </div>
      </Transition>
    </div>
  </Transition>
  <Transition appear name="fade" v-show="isLoading">
    <div class="loader"></div>
  </Transition>

</template>

<script lang="ts">
// Built-in Imports
import { computed, defineComponent, onBeforeMount, ref } from "vue";

// Custom Utils and Models Imports
import { Weather, WeatherSummary } from "../models/Weather";
import { windDirection } from "../utils/wind-direction";
import { getCountryByCode } from "../utils/countries-list";
import { getIconPath } from "../utils/fetch-weather-icon"

// Component Import
import MiniForecastWidget from "./MiniForecastWidget.vue";

export default defineComponent({
  setup(props) {

    // --------------------------------------------------------------------------
    // ------------------------- Initializing variables -------------------------
    // --------------------------------------------------------------------------

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

    const rain = ref(false)
    const isLoading = ref(true);
    const coordinates = ref<{ lat: any, lon: any }>({
      lat: 0,
      lon: 0,
    });


    // --------------------------------------------------------------------------
    // ---------------------------- Custom Functions ----------------------------
    // --------------------------------------------------------------------------

    const getLocationCoordinates = async () => {
      return new Promise((resolve, reject) => {

        if (!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition((pos: any) => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    };

    // Fetching location with latitude and longitude
    const reverseGeocode = async () => {
      if (coordinates.value.lat === 0 || coordinates.value.lon === 0) {
        return;
      }
      const geoCodeAPI = `https://api.openweathermap.org/geo/1.0/reverse?lon=${coordinates.value.lon}&lat=${coordinates.value.lat}&limit=1&appid=${props.openWeatherApiKey}`;
      await fetch(geoCodeAPI)
        .then(res => res.json())
        .then(res => {
          const country = getCountryByCode(res[0]?.country);
          currentWeather.value.country = country;
          location.value = {
            city: res[0]?.name,
            country: country,
          };
        });
    };

    // Fetches weather data from the Open Weather API
    const fetchWeatherForecast = async () => {
      if (coordinates.value.lat === 0 || coordinates.value.lon === 0) {
        return;
      }
      isLoading.value = true;
      // const response = 
      // const resp = await response.json();
      const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lon=${coordinates.value.lon}&lat=${coordinates.value.lat}&units=metric&exclude=minutely,hourly&appid=${props.openWeatherApiKey}`;
      await fetch(weatherAPI)
        .then(resp => resp.json())
        .then((resp) => {
          // Manually mapping response to our model
          if (resp.current) {
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
          }


          if (resp.daily) {
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
            isLoading.value = false;
          }
        }).catch((err) => {
          isLoading.value = false;
          throw err;
        });



    }

    const updateWeather = async () => {
      await fetchWeatherForecast();
    };

    const makeItRain = () => {
      rain.value = !rain.value;
    }


    // --------------------------------------------------------------------------
    // ---------------------------- Life Cycle Hook -----------------------------
    // --------------------------------------------------------------------------

    onBeforeMount(() => {

      // Fetching location with latitude and longitude
      if (props.lat && props.lon) {

        console.log("Fetching weather data from lat and lon");

        coordinates.value = {
          lat: props.lat,
          lon: props.lon,
        };
        reverseGeocode();
        fetchWeatherForecast();

      } else {

        console.log("Fetching weather data from location");

        getLocationCoordinates().then((pos: any) => {
          coordinates.value = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          reverseGeocode();
          fetchWeatherForecast();

        }).catch((err) => {
          console.log(err);
        });

      }
    });


    // --------------------------------------------------------------------------
    // -------------------- Computed Functions / Properties ---------------------
    // --------------------------------------------------------------------------


    const weatherIcon = computed(() => getIconPath(currentWeather.value.weatherId, currentWeather.value.weatherMain, currentWeather.value.weatherIcon)); // Get weather icon by invoking custom 'getWeatherIcon' util function
    const windDir = computed(() => windDirection(currentWeather.value.windDeg)); // Computing wind direction by invoking custom 'windDirection' util function
    const country = computed(() => getCountryByCode(currentWeather.value.country)); // Computing country by invoking custom 'getCountryByCode' util function
    const temperature = computed(() => Math.round(currentWeather.value.temperature)); // Round Temperature to nearest integer
    const windSpeed = computed(() => Math.round(currentWeather.value.windSpeed)); // Round Wind speed to nearest integer

    // --------------------------------------------------------------------------
    // --------------------------------- Return ---------------------------------
    // --------------------------------------------------------------------------

    return { location, weatherData, windDir, currentWeather, country, temperature, windSpeed, weatherIcon, updateWeather, makeItRain, rain, isLoading };
  },
  components: {
    MiniForecastWidget
  },
  props: {
    openWeatherApiKey: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: false,
    },
    lon: {
      type: Number,
      required: false,
    }
  }
});
</script>

