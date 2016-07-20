'use strict';

var imagemin     = require('gulp-imagemin');
	// imagemin plugins
	var gifsicle = require('imagemin-gifsicle');
	var optipng  = require('imagemin-optipng');
	var pngquant = require('imagemin-pngquant');
	var mozjpeg  = require('imagemin-mozjpeg');
	var svgo     = require('imagemin-svgo');

// Config options: {
// 		config.task.files: [gulp glob of files] || defaults to config.appFiles.images
//		config.task.outputPath: 'path to output file' || defaults to config.paths.images.dest
// }

module.exports = function(gulp, $, config) {
	var _filesToProcess = config.files || config.appFiles.styles;
	var _outputPath = config.task && config.task.outputPath || config.paths.styles.dest;

	// Image minification and compression
	return function() {
		return gulp.src(_filesToProcess)
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [
					gifsicle({interlaced: true}),
					optipng({optimizationLevel: 3}),
					pngquant({quality: '65-80', speed: 4}),
					mozjpeg({quality: '70'}),
					svgo()
				]
			})).on('error', $.errorHandler)
			.pipe(gulp.dest(_outputPath));
	};
};
