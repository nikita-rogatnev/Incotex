"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("clean", function () {
	return del(["./*.css", "./images/icons", "./js"]);
});

gulp.task("style", function () {
	gulp
		.src("./src/less/*.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 1 version", "last 2 Chrome versions", "last 2 Firefox versions", "last 2 Opera versions", "last 2 Edge versions"]
			}),
			mqpacker({sort: true})
		]))
		.pipe(gulp.dest("./"))
		.pipe(minify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("./"))
		.pipe(server.stream());
});

gulp.task("symbols", function () {
	return gulp
		.src("./images/**/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({inlineSvg: true}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest("./images/icons"));
});

gulp.task("minJs", function () {
	return gulp
		.src("./src/js/**.js")
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("./js"));
});

gulp.task("build", function (fn) {
	run("clean", "style", "minJs", "symbols");
});
