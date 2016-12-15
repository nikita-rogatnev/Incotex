"use strict";

module.exports = function (grunt) {

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-cssnano");
	grunt.loadNpmTasks('grunt-svg-sprites');

	grunt.initConfig({

		less: {
			style: {
				files: {
					"./template_styles.css": "./less/style.less",
					"./bootstrap.css": "./less/bootstrap.less"
				}
			}
		},

		postcss: {
			prefix: {
				options: {
					processors: [require("autoprefixer")({browsers: "last 2 versions"})]
				},
				src: "./template_styles.css",
				dest: "./template_styles.css"
			},
			minify_style_css: {
				options: {
					processors: [require("cssnano")()]
				},
				src: "./template_styles.css",
				dest: "./template_styles.min.css"
			},
			minify_bootstrap_css: {
				options: {
					processors: [require("cssnano")()]
				},
				src: "./bootstrap.css",
				dest: "./bootstrap.min.css"
			}
		}

	});

	grunt.registerTask("default", ["less", "postcss"]);

};
