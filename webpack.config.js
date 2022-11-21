"use strict";

let path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./pages/script.js",
	output: {
		filename: "bundle.js",
		path: __dirname + "/js",
	},
	watch: true,

	devtool: "source-map",

	module: {},
	plugins: [
		// new BrowserSyncPlugin({
		// 	// browse to http://localhost:3000/ during development,
		// 	// ./public directory is being served
		// 	host: "localhost",
		// 	port: 3000,
		// 	server: { baseDir: ["VideoHosting"] },
		// }),
	],
};
