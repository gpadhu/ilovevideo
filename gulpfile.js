var gulp = require('gulp'),
		connect = require('gulp-connect'),
		gulpIf = require('gulp-if'),
		compass = require('gulp-compass'),
		utility = require('gulp-util'),
		uglify = require('gulp-uglifyjs'),
		beautify = require('gulp-beautify'),
		concat = require('gulp-concat'),
		minifyHTML = require('gulp-htmlmin'),
		browserify = require('gulp-browserify');

var environment = 'production';
var buildPath = './builds/' + environment;
var sassSrc = './components/sass/*.scss';
var scriptSrc = './components/scripts/*.js';
var htmlSrc = './builds/development/*.html';
var sassStyle = environment == 'development' ? 'expanded' : 'compressed';

gulp.task('sass', function(){
	return gulp.src(sassSrc)
		.pipe(compass({
			sass: 'components/sass',
			style: sassStyle,
		}).on('error', utility.log))
		.pipe(gulp.dest(buildPath+'/css'))
		.pipe(connect.reload());
});

gulp.task('scripts', function(){
	return gulp.src(scriptSrc)
		.pipe(concat('main.js'))
		.pipe(gulpIf(environment == 'production', uglify().on('error', utility.log), beautify()))
		.pipe(browserify({insertGlobals : false}))
		.pipe(gulp.dest(buildPath+'/scripts'))
		.pipe(connect.reload());
});

gulp.task('connect', function(){
	connect.server({
		root: buildPath,
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src(htmlSrc)
		.pipe(gulpIf(environment == 'production', minifyHTML({collapseWhitespace: true})))
		.pipe(gulpIf(environment == 'production', gulp.dest('./builds/production')))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch([buildPath+'/*.html'], ['html']),
	gulp.watch([sassSrc], ['sass']),
	gulp.watch([scriptSrc], ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'html', 'connect', 'watch']);