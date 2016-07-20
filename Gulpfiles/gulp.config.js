'use strict';

// File reference variables
var basePaths = {
	src: 'src/',
	dest: 'dst/'
};

var paths = {
	html: {
		src: basePaths.src,
		dest: basePaths.dest
	},
	images: {
		src: basePaths.src + 'images/',
		dest: basePaths.dest
	},
	svgs: {
		src: basePaths.src + 'images/icons',
		dest: basePaths.dest
	},
	scripts: {
		src: basePaths.src + 'js/',
		dest: basePaths.dest + 'js/'
	},
	styles: {
		src: basePaths.src + 'css/scss/',
		dest: basePaths.dest + 'css/'
	}
};

var appFiles = {
	html: paths.html.src +  '**/*.html',
	images: paths.images.src +  '**/*.{jpg,jpeg,png,gif,svg}',
	svgs: paths.svgs.src +  '**/*.svg',
	styles: paths.styles.src + '**/*.scss',
	vendorScriptFile: 'vendors.js',
	scriptFile: 'resume.js'
};
appFiles.siteScripts = [
	paths.scripts.src + '**/*.js',
	'!' + paths.scripts.src + 'vendors/**/*.js',
	'!' + paths.scripts.src + appFiles.scriptFile
];
appFiles.vendorScripts = [
	paths.scripts.src + 'vendors/*.js'
];
appFiles.allScripts = [
	paths.scripts.src + 'vendors/*.js',
	paths.scripts.src + '**/*.js',
	'!' + paths.scripts.src + appFiles.scriptFile
];

module.exports = {
	basePaths: basePaths,
	paths: paths,
	appFiles: appFiles
};