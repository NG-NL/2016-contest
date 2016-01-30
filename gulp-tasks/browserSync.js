module.exports = function (gulp, settings, argv, reload) {
    var url = require('url');
    return function () {
        var browserSync = require('browser-sync'),
            proxy = require('proxy-middleware'),
            port = argv.port || settings.serverport;

        reload = browserSync.reload;

        // Watch any files in dist/*, reload on change
        gulp.watch([settings.dist + '**']).on('change', reload);

        // proxy settings for /redirect
        var proxyOptions = url.parse('http://localhost:8080/redirect');
        proxyOptions.route = '/redirect';

        return browserSync({
            browser: ['google chrome'],
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            },
            logLevel: 'info',
            open: {
                browser: 'chrome', // if not working OS X browser: 'Google Chrome'
                url: 'http://http://localhost:' + port
            },
            port: port,
            reloadOnRestart: true,
            scrollProportionally: true, // Sync viewports to TOP position
            scrollThrottle: 50,
            server: {
                baseDir: settings.dist,
                middleware: [proxy(proxyOptions)]
            },
            ui: {
                port: port + 1,
                weinre: {
                    port: port + 2
                }
            }
        });
    };
};