// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
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
        "process.env": {},
    },
});