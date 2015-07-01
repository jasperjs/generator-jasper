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
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-jasper');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        dist: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        jasperPkg: grunt.file.readJSON('jasper.json'),
        clean: {
            dist: [
                'dist'
            ]
        },
        typescript: {
            options: {
                module: 'amd', //or commonjs
                target: 'es5', //or es3
                sourceMap: false,
                declaration: false,
                references: [
                    'typed/*.d.ts',
                    'node_modules/jasperjs/jasper.d.ts'
                ]
            },
            base: {
                src: [ '<%= tsFilesMask %>'],
                watch: true
            },
            withtests: {
                src: [ '<%= tsFilesMask %>', 'test/**/*.ts']
            }
        },
        /** more about grunt-jasper build properties here - https://github.com/jasperjs/grunt-jasper */
        jasper: {
            options: {
                singlePage: 'index.html',
                appPath: '<%= appPath %>',
                bootstrapScripts: '<%= bootstrapScripts %>',
                baseCss: '<%= baseCss %>',
                defaultRoutePath: '/',
                packageOutput: 'dist'
            },

            debug: {
                options: {
                    baseHref: '/jasper-application/',
                    package: false
                }
            },

            release: {
                options: {
                    package: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            ci: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    /**
     * Task builds jasper-application
     */
    grunt.registerTask('default', ['typescript', 'jasper:debug']);

    /**
     * Task test the application
     */
    grunt.registerTask('test',
        [
            'typescript:withtests', // compile application and tests
            'jasper:debug', // build jasper-application
            'karma:ci' // run tests
        ]);

    /**
     * Package application to run on production. Process minifies all styles, scripts and templates.
     */
    grunt.registerTask('package',
        [
         'test', // build and test the application
         'clean', // clean dist folder
         'jasper:release' // package jasper-application to dist folder
        ]);

};