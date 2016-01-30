module.exports = function (gulp, plugins, settings, argv) {
    return function () {
        return gulp.src([settings.src + 'js/**/*.js'])
            .pipe(plugins.plumber())
            //.pipe(plugins.concat('main.js'))
            .pipe(gulp.dest(settings.dist + 'app/js'))
    };
};