module.exports = function (gulp, plugins, settings) {
    return function () {
        return gulp.src(settings.src + '**/*.ts')
            .pipe(plugins.typescript({
                experimentalDecorators: true,
                module:'system',
                isolatedModules: true
            }))
            .pipe(gulp.dest(settings.src + 'js'))
    };
};