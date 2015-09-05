var gulp = require('gulp');
var browserify = require('browserify');
var babelify= require('babelify');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var args   = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('build', function() {
	browserify('./src/workspace.js', { debug: true })
	.transform(babelify)
	.bundle()
	.on('error', util.log.bind(util, 'Browserify Error'))
	.pipe(source('./workspace.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(gulpif(!args.debug, uglify({ mangle: false })))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/'))
	.on('end', function() {
		console.log('Built');
	});
});

gulp.task('default', ['build']);

gulp.task('watch', function () {
   gulp.watch('src/**/*.js', ['build']);
});
