<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const msg = "Hello world!";

    return { msg };
  },
});
</script>

<style lang="sass">
</style>
