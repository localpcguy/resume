'use strict';

module.exports = function(gulp, $, config) {

	// var webserverTaskHttp = $.getTask('webserver');
	// var webserverTaskHttps = $.getTask('webserver', { https: true });

	// Watch files, run tasks
	return function(done) {
		if (config.options.isProduction) {
			return;
		}

		// TODO: Need copy/del tasks (re: HTML files)

		// Start webserver
		// webserverTaskHttp();
		// webserverTaskHttps();

		// Compile images on change (currently disabled for watch, run manually)
		// gulp.watch(config.appFiles.images, $.getTask('imagemin'));

		// Compile SCSS
		gulp.watch(config.appFiles.styles, $.getTask('styles'));

		// Compile vendor JS
		gulp.watch(config.appFiles.vendorScripts, function () {
			return $.getTask('javascript', {
				files: config.appFiles.vendorScripts,
				outputSourceMap: false
			});
		});

		// Compile site JS
		gulp.watch(config.appFiles.siteScripts, function () {
			return $.getTask('javascript', {
				files: config.appFiles.siteScripts
			});
		});

		// Lint site JS
		gulp.watch(config.appFiles.siteScripts, $.getTask('lint'));

		// return a callback function to signify the task has finished running (the watches will continue to run)
		if (typeof done === 'function') {
			done();
		}
	};
};