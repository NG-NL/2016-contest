module.exports = function (gulp, plugins, settings) {
    return function () {
        return gulp.src([settings.dist + '*'], { read: false })
            .pipe(plugins.rimraf({force: true}));
    };
};