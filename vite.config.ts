// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from 'vite-plugin-eslint'
import path from "path";

export default defineConfig({
    plugins: [vue(), eslint()],
    css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "./src/scss/_mixins.scss";`
          },
        },
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: [
          { // To keep the compatibility with vue-use-web
            find: '@vue/composition-api',
            replacement: 'vue'
          },
          {
            find: '@',
            replacement: path.resolve(__dirname, 'src')
          },
        ]
      },
    define: {
        "process.env": {
          VUE_APP_OPEN_WEATHER_API_KEY: JSON.stringify(process.env.VUE_APP_OPEN_WEATHER_API_KEY),
        },
    },
    build: {
      lib: {
        // src/indext.ts is where we have exported the component(s)
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "WeatherVueWidget",
        // the name of the output files when the build is run
        fileName: "weather-vue-widget",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue",
          },
        },
      },
    },
});