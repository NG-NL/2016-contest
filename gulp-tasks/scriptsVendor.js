module.exports = function (gulp, plugins, settings) {
    return function () {

        return gulp.src([
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2.dev.js'
        ])
            .pipe(plugins.concat('libs.js'))
            .pipe(gulp.dest(settings.dist + 'app/libs'));
    };
};