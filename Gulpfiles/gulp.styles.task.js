'use strict';

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Config options: {
// 		config.task.files: [gulp glob of files] || defaults to config.appFiles.styles
//		config.task.outputPath: 'path to output file' || defaults to config.paths.styles.dest
//		config.task.outputSourceMap: boolean, should output sourcemap || defaults to true
// }

module.exports = function(gulp, $, config) {
	var _filesToProcess = config.files || config.appFiles.styles;
	var _outputPath = config.task && config.task.outputPath || config.paths.styles.dest;
	var _outputSourcemap = true;

	if (config.task && (config.task.outputSourceMap === false || config.options.sourceMap === false)) {
		_outputSourcemap = false;
	}

	// Gulp task for SCSS files
	return function() {
		return gulp.src(_filesToProcess)
			.pipe(_outputSourcemap ? $.sourcemaps.init() : $.gutil.noop())
			.pipe(sass({outputStyle: config.options.sassStyle})).on('error', $.errorHandler)
			.pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false})).on('error', $.errorHandler)
			.pipe(_outputSourcemap ? $.sourcemaps.write() : $.gutil.noop())
			.pipe(gulp.dest(_outputPath))
			.pipe($.filesize());
	}
};