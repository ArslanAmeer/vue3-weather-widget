const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
	transpileDependencies: true,
	// Uncomment this part if you need to use dotenv-webpack plugin
	// configureWebpack: {
	//   plugins: [new Dotenv()],
	// },
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "~@/scss/style.scss";`,
			},
		},
	},
	configureWebpack: {
		output: {
			libraryExport: 'default',
		},
	},
});
