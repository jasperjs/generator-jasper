﻿var generators = require('yeoman-generator');
var Base = require('../base');
var path = require('path');

module.exports = generators.Base.extend({
    constructor: function () {
        Base.apply(this, arguments);
        this.pkg = require('../package.json');

        this.argument('appName', {
            desc: 'Your project name',
            type: String,
            required: true
        });

        this.argument('appModuleName', {
            desc: 'Application root module name',
            type: String,
            required: false
        });

        this.argument('appPath', {
            desc: 'Path to application files',
            type: String,
            required: false
        });

    },

    main: function () {

        var getRandomPort = function(){
            var min = 8080, max = 8090;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.appPath = this.appPath || 'app';

        this.config.set('appModuleName', this.appModuleName || 'spa');
        this.config.set('appPath', this.appPath);

        this.config.save();

        /* creating single page*/
        this.copyTpl(
            'index.html',
            'index.html',
            { appname: this.appName }
        );

        /* creating grunt configuration */
        this.copyTpl(
            'gruntfile.js',
            'gruntfile.js',
            {
                tsFilesMask: this.appPath +  '/**/*.ts',
                appPath: this.appPath,
                baseScripts: '<%= jasperPkg.baseScripts %>',
                startup: '<%= jasperPkg.startup %>',
                baseCss: '<%= jasperPkg.baseCss %>',
                jDebugEnabled: '<%= jasperPkg.jDebug.enabled %>',
            });

        this.copyTpl('jasper.json', 'jasper.json')
        this.copyTpl('typed/jquery.d.ts', 'typed/jquery.d.ts');
        this.copyTpl('typed/angular.d.ts', 'typed/angular.d.ts');
        this.copyTpl('typed/jasmine.d.ts', 'typed/jasmine.d.ts');

        this.copyTpl('config/debug.json', 'config/debug.json');

        this.copyTpl('test-env/pages.tests.ts.tmpl', 'test/pages.tests.ts', {
            appModuleName: this.config.get('appModuleName')
        });

        this.copyTpl('base.css', 'css/base.css');

        this.copyTpl('bootstrap.ts', path.join(this.appPath, 'bootstrap.ts'));

        this.copyTpl(
            'karma.conf.js',
            'karma.conf.js',
            {
                appPath: this.appPath
            });

        this.copyTpl('server.js', 'server.js', {
            port: getRandomPort().toString()
        });

        this.composeWith('jasper:area', { args: ['core'] });
        this.composeWith('jasper:page', { args: ['core', 'home-page', '/'] });
    }

});