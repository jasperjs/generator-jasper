var generators = require('yeoman-generator');
var path = require('path');
var utils = require('../utils');
var Base = require('../base');

module.exports = generators.Base.extend({
    constructor: function () {
        Base.apply(this, arguments);

        this.argument('area', {
            desc: 'Specify area name to place new component',
            type: String,
            required: true
        });

        this.argument('pageName', {
            desc: 'Specify page name for component',
            type: String,
            required: true
        });

        this.argument('pageRouteMask', {
            desc: 'Specify page route mask',
            type: String,
            required: true
        });

        this.readSettings();
    },

    writing: function () {
        var areaPath = this.getAreaPath(this.area);

        var basePath = path.join(areaPath, 'pages', this.pageName);

        // Creating TypeScript code file
        var tsClassName = utils.pascalCaseTagName(this.pageName);

        this.copyTpl(
            'page_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'pages'),
                pageName: this.pageName,
                pageUrl: this.pageRouteMask
            });

        // Creating page view
        this.copyTpl(
            'page.html',
            path.join(basePath, this.pageName + '.html'),
            {
                appname: this.appName
            });

        //Creating definition file
        this.writeDefinition(basePath, {
            templateFile: this.pageName + '.html',
            type: 'page',
            route: this.pageRouteMask,
            ctor: utils.getTSModuleName(this.appModuleName, this.area, 'pages', tsClassName)
        });

    }

});