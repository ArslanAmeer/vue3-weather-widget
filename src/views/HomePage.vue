<template>
  <div class="container">
    <WeatherWidget :lat="41.3888" :lon="2.159" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherWidget from '@/components/WeatherWidget.vue';

export default defineComponent({
  components: {
    WeatherWidget,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

// Setting Global body style
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    font-weight: 400;
    color: #ffffff;
  }

  // Setting container to place content in center of page
  .container {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
}
</style>
