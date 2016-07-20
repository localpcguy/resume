'use strict';

var svgSprite = require('gulp-svg-sprite');

// Config options: {
// 		config.task.files: [gulp glob of files] || defaults to config.appFiles.svgs
//		config.task.outputPath: 'path to output file' || defaults to config.paths.svgs.dest
// }

module.exports = function(gulp, $, config) {

	var _filesToProcess = config.files || config.appFiles.svgs;
	var _outputPath = config.task && config.task.outputPath || config.paths.svgs.dest;
	var _svgSpriteConfig = {
		mode: {
			css: false,
			symbol: true // testing to see if this will stream the symbol file to the gulp.dest pipe, so gulp writes the file
			// symbol: {
			// 	dest: _outputPath
			// }

		},
		shape: {
			dimension: {
				precision: -1
			},
			transform: [{
				svgo: {removeViewBox: false}
			}]
		}
	};

	// Turn SVG files into SVG Sprite
	return function() {
		return gulp.src(_filesToProcess)
			.pipe(svgSprite(_svgSpriteConfig)).on('error', $.errorHandler)
			.pipe(gulp.dest(_outputPath));
			//.pipe(gulp.dest('.')); // svgSprite automatically outputs the file per the config object
	};
};