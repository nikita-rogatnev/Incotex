"use strict";

module.exports = function(grunt) {

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-cssnano");

	grunt.initConfig({

		less: {
			style: {
				files: {
					"./css/template_styles.css": "./less/style.less",
					"./css/bootstrap.css": "./less/bootstrap.less"
				}
			}
		},

		postcss: {
			prefix: {
				options: {
					processors: [require("autoprefixer")({
						browsers: "last 2 versions"
					})]
				},
				src: "css/template_styles.css",
				dest: "css/template_styles.css"
			},
			minify_style_css: {
				options: {
					processors: [require("cssnano")()]
				},
				src: "css/template_styles.css",
				dest: "css/template_styles.min.css"
			},
			minify_bootstrap_css: {
				options: {
					processors: [require("cssnano")()]
				},
				src: "css/bootstrap.css",
				dest: "css/bootstrap.min.css"
			}
		}

	});

	grunt.registerTask("default", ["less", "postcss"]);

};
