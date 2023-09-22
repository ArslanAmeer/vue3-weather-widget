const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
});

// const Dotenv = require('dotenv-webpack');
// module.exports = {
// 	configureWebpack: {
// 		plugins: [new Dotenv()],
// 	},
// };

// Load Scss files globally
const path = require('path');
module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "~@/scss/style.scss";`,
			},
		},
	},
};