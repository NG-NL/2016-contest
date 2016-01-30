var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv,
    reload; // browser sync reload functionality for css injection

var config = require('./package.json');
var settings = config.settings;

gulp.task('clean', require('./gulp-tasks/clean')(gulp, plugins, settings));

gulp.task('transpile-ts', require('./gulp-tasks/transpile')(gulp, plugins, settings));

gulp.task('copy-index', require('./gulp-tasks/copyIndex')(gulp, plugins, settings));
gulp.task('copy-templates', require('./gulp-tasks/copyTemplates')(gulp, plugins, settings));

gulp.task('styles', require('./gulp-tasks/styles')(gulp, plugins, settings, reload, argv));

gulp.task('scripts-app', ['transpile-ts'], require('./gulp-tasks/scriptsApp')(gulp, plugins, settings, argv));
gulp.task('scripts-vendor', require('./gulp-tasks/scriptsVendor')(gulp, plugins, settings, argv));

gulp.task('browser-sync', ['watch'], require('./gulp-tasks/browserSync')(gulp, settings, argv, reload));


gulp.task('build', function(cb) {
    runSequence('clean', ['styles', 'copy', 'scripts-vendor'], 'scripts-app', cb);
});

gulp.task('start-dev', function(cb) {
    runSequence('build', ['start'], cb);
});

gulp.task('copy', ['copy-index', 'copy-templates'], function() {});

gulp.task('start', ['browser-sync'], function() {});


gulp.task('watch', function() {

    // watch index.html
    gulp.watch(settings.src + 'index.html', ['copy-index']);

    // watch html files
    gulp.watch(settings.src + 'templates/**/*.html', ['copy-templates']);

    gulp.watch([settings.src + 'css/**/*.css'], ['styles']);

    // Watch .ts files
    gulp.watch(settings.src + '**/*.ts', ['scripts-app']);

    // Watch libs .js files
    gulp.watch('gulp-tasks/scriptsVendor.js', ['scripts-vendor']);

});