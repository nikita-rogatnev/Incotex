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
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("clean", function () {
	return del(["./*.css", "./images/icons"]);
});

gulp.task("style", function () {
	gulp
		.src("./less/*.less")
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

gulp.task("build", function (fn) {
	run("clean", "style");
});
