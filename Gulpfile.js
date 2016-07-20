'use strict';

// Requires & plugins
var gulp         = require('gulp');
var config       = require('./Gulpfiles/gulp.config.js');

// Global plugins
var plugins = {
	getTask: getTask,
	errorHandler: errorHandler,
	filesize: require('filesize'),
	gutil: require('gulp-util'),
	sourcemaps: require('gulp-sourcemaps'),
	livereload: require('gulp-livereload')  // does this need to be global?
};

// use "gulp --prod" to trigger production/build mode from commandline
config.options = {};
config.options = {
	isProduction: config.options.isProduction || false,
	sassStyle: config.options.sassStyle || 'expanded',
	sourceMap: config.options.sourceMap || true,
	showErrorStack: config.options.showErrorStack || plugins.gutil.env.stacktrace
};

if (plugins.gutil.env.prod) {
	config.options.isProduction = true;
	config.options.sassStyle = 'compressed';
	config.options.sourceMap = false;
}

function getTask(task, taskOptions) {
	config.task = taskOptions;
	
	return require('./Gulpfiles/gulp.' + task + '.task')(gulp, plugins, config);
}

// Standard error handler
function errorHandler(err){
	plugins.gutil.beep();
	// Log to console
	plugins.gutil.log(gutil.colors.red('Error: '), err.message, ' - ', err.fileName);
	if (showErrorStack) {
		plugins.gutil.log(err.stack);
	}
	this.emit('end');
}

/*********************
	Task(s)

	- Tasks all listed at the bottom for easy scanning, 
	- Each task references the function that will be called
	- Task functions should return a stream so Gulp can know when the task is finished
	    More info: https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support

*********************/

// TODO: Need copy/del tasks (re: HTML files)

// Style Task(s)
gulp.task('styles', getTask('styles'));

// Script Task(s)
gulp.task('lint', getTask('lint'));
gulp.task('scripts', getTask('javascript'));

// Image Compression Task(s)
gulp.task('imagemin', getTask('image'));

// Create SVG Sprite
gulp.task('spriteSVGs', getTask('svg'));

// Watch Task(s)
gulp.task('webserver', getTask('webserver'));
gulp.task('webserver:https', getTask('webserver', { https: true }));

// Watch Task(s)
gulp.task('watch', getTask('watch'));

// Default task
// by default it will run the dev process. 
// Use "gulp --prod" to build for production
gulp.task('default', ['webserver', 'webserver:https', 'styles', 'lint', 'scripts'], getTask('watch'));

// Build task, skips the watch/webserver
gulp.task('build', ['styles', 'lint', 'scripts']);
