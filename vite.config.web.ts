import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from 'vite-plugin-eslint';
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
      {
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
    rollupOptions: {
      // If you still need to use external, place it here.
      external: [],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
