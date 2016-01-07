module.exports = function(grunt) {
    var shell = require('shelljs');

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'style.css': ['app/scss/style.scss']
                }
            }
        }
    });

    grunt.registerTask('browserify', 'Bundle javascript with browserify', function() {
        // Check if browserify exists
        var browserify = shell.which('browserify');
        if (browserify === null) {
            grunt.log.error('browserify not found!\nInstall browserify and try again.\nHow to install: `sudo npm install -g browserify`');
            grunt.fail.fatal('command browserify is not available!');
        } else {
            shell.exec('browserify index.js -o bundle.js', { silent: true }).output;
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['sass', 'browserify']);

};
