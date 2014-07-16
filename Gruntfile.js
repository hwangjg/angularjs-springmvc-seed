"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			less: {
				files: ["src/main/webapp/style/*.less"],
				tasks: ["less:dev"]
			}
		},
		clean: {
			beforeDist: ["webapp_target/*"],
			afterDist: ["webap_target/_tmp_style/*", "webapp_target/_tmp_style"],
			removeCSS: ["src/main/webapp/style/*.css"]
		},
		less: {
			dev: {
				files: [{
					expand: true,
					cwd: "src/main/webapp/style/less",
					src: ["**/*.less", "!**/common/*.less"],
					dest: "src/main/webapp/style/generated_css/",
					ext: ".css"
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: "src/main/webapp/style/less",
					src: ["**/*.less", "!**/_*.less"],
					dest: "webapp_target/_tmp_style/",
					ext: ".css"
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					"webapp_target/style.css": ["webapp_target/_tmp_style/**/*.css"]
				}
			}
		},
		uglify: {
			dist: {
				files: {
					"webapp_target/script.js": [
						"src/main/webapp/script/myNewApp/core/angularBoot.js",
						"src/main/webapp/script/myNewApp/**/*.js"
					]
				}
			}
		},
		processhtml: {
			dist: {
				files: {
					"webapp_target/index.html": ["src/main/webapp/index.html"]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					"webapp_target/index.html": "webapp_target/index.html"
				}
			}
		},
		copy: {
			dist: {
				files: [
					{   cwd: "src/main/webapp/static/", dest: "webapp_target/static/", src: "**", expand: true  },
					{	cwd: "src/main/webapp/script/lib/", dest: "webapp_target/script/lib/", src: "**", expand: true   },
					{	cwd: "src/main/webapp/style/lib", dest: "webapp_target/style/lib", src: "**", expand: true   },
					{	cwd: "src/main/webapp/html/", dest: "webapp_target/html/", src: "**", expand: true   }
				]
			}
		},
		karma: {
			dev: {
				configFile: "src/test/resources/karma-config.js",
				singleRun: false
			},
			dist: {
				configFile: "src/test/resources/karma-config.js",
				singleRun: true
			}
		},
		jshint: {
			all: [
				"src/main/webapp/script/myNewApp/core/angularBoot.js",
				"src/main/webapp/script/myNewApp/**/*.js"
			]
		}
	});

	// Plugins
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-processhtml");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-contrib-jshint");

	// Tasks
	grunt.registerTask("dev", ["less:dev", "watch:less"]);
	grunt.registerTask("removeCSS", ["clean:removeCSS"]);

	grunt.registerTask("test", ["karma:dev"]);

	grunt.registerTask("hint", ["jshint:all"]);

	grunt.registerTask("dist", [
		"karma:dist",
		"clean:beforeDist",
		"less:dist",
		"cssmin:dist",
		"processhtml:dist",
		"uglify",
		"htmlmin",
		"copy:dist",
		"clean:afterDist",
		"clean:removeCSS"
	]);
};