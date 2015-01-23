/*
 * jasper-application
 * https://github.com/jasperjs/jasper-application
 *
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-jasper');

    grunt.initConfig({
        dist: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        jasperPkg: grunt.file.readJSON('jasper.json'),
        typescript: {
            base: {
                src: [ '<%= tsFilesMask %>'],
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: false,
                    declaration: false,
                    references: [
                        'typed/*.d.ts',
                        'vendor/jasper/jasper.d.ts'
                    ]
                },
                watch: true
            }
        },
        /* more about jasper build properties here - https://github.com/jasperjs/grunt-jasper */
        jasper: {
            options: {
                singlePage: 'index.html',
                appPath: '<%= appPath %>',
                bootstrapScripts: this.jasperPkg.bootstrapScripts,
                baseCss: this.jasperPkg.baseCss,
                defaultRoutePath: '/',
                packageOutput: 'dist'
            },

            debug: {
                options: {
                    package: false
                }
            },

            release: {
                options: {
                    package: true
                }
            }
        }
    });


    grunt.registerTask('default', ['typescript', 'jasper:debug']);
    grunt.registerTask('package', ['typescript', 'jasper:release']);

};