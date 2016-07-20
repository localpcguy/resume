'use strict';

var webserver = require('gulp-webserver');

// Config options: {
// 		config.task.directory: directory to serve webserver from || defaults to config.basePaths.dest
// 		config.task.https: boolean if should start as https || defaults to false
//		config.task.outputPath: 'path to output file' || defaults to config.paths.images.dest
// }

module.exports = function(gulp, $, config) {
	var _directory = config.task.directory || config.basePaths.dest;
	var _isHttps = config.task && config.task.https;
	var _port = $.gutil.env.port || _isHttps ? 8443 : 8000;

	// Webserver
	return function() {
		// Don't start website if production build
		if (config.options.isProduction) {
			return;
		}

		return gulp.src(_directory)
			.pipe(webserver({
				directoryListing: false,
				fallback: 'index.html',
				host: '0.0.0.0',
				livereload: true,
				open: false,
				port: _port,
				https: _isHttps
			}));
	};
};