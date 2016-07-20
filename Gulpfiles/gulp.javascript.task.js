'use strict';

var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

// Config options: {
// 		config.task.files: [gulp glob of files] || defaults to config.appFiles.siteScripts
//		config.task.outputPath: 'path to output file' || defaults to config.paths.scripts.dest
//		config.task.outputSourceMap: boolean, should output sourcemap || defaults to true
// }

module.exports = function(gulp, $, config) {
	var _filesToProcess = config.task && config.task.files || config.appFiles.siteScripts;
	var _outputPath = config.task && config.task.outputPath || config.paths.scripts.dest;
	var _outputSourcemap = true;

	if (config.task && (config.task.outputSourceMap === false || config.options.sourceMap === false)) {
		_outputSourcemap = false;
	}

	// Gulp task for JavaScript files
	return function() {
		return gulp.src(_filesToProcess)
			.pipe(_outputSourcemap ? $.sourcemaps.init() : $.gutil.noop())
			.pipe(concat(config.task.outputFile, {newLine: ';\r\n'})).on('error', $.errorHandler)
			.pipe(config.options.isProduction ? $.filesize() : $.gutil.noop())
			.pipe(config.options.isProduction ? uglify() : $.gutil.noop()).on('error', $.errorHandler)
			.pipe(_outputSourcemap ? $.sourcemaps.write() : $.gutil.noop())
			.pipe(gulp.dest(_outputPath))
			.pipe($.filesize());
	};
};