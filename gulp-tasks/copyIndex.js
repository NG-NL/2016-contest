module.exports = function (gulp, plugins, settings) {
    return function () {
        return gulp.src(settings.src + 'index.html')
            .pipe(gulp.dest(settings.dist));
    };
};