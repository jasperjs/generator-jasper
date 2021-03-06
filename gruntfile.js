'use strict';
var semver = require('semver');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({


    });

    grunt.registerTask('bump', 'Bump manifest version', function (type) {
        var options = this.options({
            file: grunt.config('pkgFile') || 'package.json'
        });

        function setup(file, type) {
            var pkg = grunt.file.readJSON(file);
            var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
            return {
                file: file,
                pkg: pkg,
                newVersion: newVersion
            };
        }

        var config = setup(options.file, type);
        grunt.file.write(
            config.file,
            JSON.stringify(config.pkg, null, '  ') + '\n'
        );
        grunt.config('pkg', config.pkg);
        grunt.log.ok('Version bumped to ' + config.newVersion);
    });

}