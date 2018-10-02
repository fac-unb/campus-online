var gulp = require('gulp')

var browserSync = require('browser-sync')
var inlinesource = require('gulp-inline-source')
var htmlmin = require('gulp-htmlmin')
var mjml = require('gulp-mjml')
var pug = require('gulp-pug')
var rename = require('gulp-rename')
var util = require('gulp-util')

gulp.task('email', function(){
	return gulp.src('./src/views/templates/**/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(rename({extname: '.mjml'}))
		.pipe(mjml())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(`${__dirname}/public/`))
})

gulp.task('browser-sync', function() {
	browserSync.init({
		port: 9001,
		server: {
			baseDir: './public/',
		},
		startPath: '',
	})
})

gulp.task('watch', function(){
	gulp.watch('./src/**/*.*', ['email']).on('change', browserSync.reload)
})

gulp.task('default', ['email', 'browser-sync', 'watch'])
gulp.task('build', ['email'])
