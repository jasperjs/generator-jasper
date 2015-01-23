var generators = require('yeoman-generator');
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
            'Gruntfile.js',
            'Gruntfile.js',
            {
                tsFilesMask: this.appPath +  '/**/*.ts',
                appPath: this.appPath
            });

        this.copyTpl('jasper.json', 'jasper.json')
        this.copyTpl('bootstrap.js', path.join(this.appPath, 'bootstrap.js'));

        this.composeWith('jasper:area', { args: ['main'] });
        this.composeWith('jasper:page', { args: ['main', 'home-page', '/'] });

    }

});