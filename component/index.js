var generators = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
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

        this.argument('tagName', {
            desc: 'Specify html element tag name for component',
            type: String,
            required: true
        });

        this.readSettings();
    },

    writing: function () {
        var areaPath = this.getAreaPath(this.area);
        var basePath = path.join(areaPath, 'components', this.tagName);

        // Creating TypeScript code file
        var tsClassName = utils.pascalCaseTagName(this.tagName);
        this.copyTpl('component_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'components'),
                tagName: this.tagName
            });

        this.copyTpl('component_css.tmpl',
            path.join(basePath, this.tagName + '.css'),
            {
                tagName: this.tagName
            });

        // Creating component view
        this.copyTpl('component.html',
            path.join(basePath, this.tagName + '.html'),
            { appname: this.appName});

        //Creating definition file
        this.writeDefinition(basePath, {
            templateFile: this.tagName + '.html',
            type: 'component',
            ctrl: utils.getTSModuleName(this.appModuleName, this.area, 'components', tsClassName)
        });
    }

});