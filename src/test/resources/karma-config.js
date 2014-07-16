
module.exports = function (config) {
	config.set({
		frameworks: ["jasmine"],
		basePath: "../../main/webapp/script/",
		files: [
			"lib/jquery.min.js",
			"lib/angular.min.js",
			"lib/**/*.js",
			"myNewApp/core/angularBoot.js",
			"myNewApp/**/*.js",

			"../../../test/web/**/*.js"
		],
		exclude: [],
		preprocessors: {},
		reporters: ['progress'],
		logLevel: config.LOG_INFO,
		browsers: ["PhantomJS"],
		singleRun: false,
		captureTimeout: 5000,
		autoWatch: true,
		colors: true,
		port: 9876
	});
};
