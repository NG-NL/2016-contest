module.exports = function (gulp, plugins, settings) {
    return function () {
        return gulp.src(settings.src + 'templates/**/*')
            .pipe(gulp.dest(settings.dist + 'app/templates'));
    };
};