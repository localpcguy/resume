'use strict';

var eslint = require('gulp-eslint');

// Config options: {
// 		config.task.files: [gulp glob of files] || defaults to config.appFiles.siteScripts
// }

module.exports = function(gulp, $, config) {
	var _filesToProcess = config.files || config.appFiles.siteScripts;

	// Gulp task for eslint
	return function() {
		return gulp.src(_filesToProcess)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.results(_displayResults));
	};

	function _displayResults(results) {
		if (results.warningCount === 0 && results.errorCount === 0) {
			$.gutil.log(gutil.colors.green('Congratulations! No ESLint warnings or errors.'));
		} else {
			$.gutil.beep();
		}
	}
};