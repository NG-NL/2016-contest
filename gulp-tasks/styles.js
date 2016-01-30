module.exports = function (gulp, plugins, settings, reload, argv) {
    return function () {
        return gulp.src([settings.src + 'css/**/*.css'])
            .pipe(plugins.plumber())
            .pipe(plugins.concat('main.css'))
            .pipe(gulp.dest(settings.dist + 'app/css'));
    };
};