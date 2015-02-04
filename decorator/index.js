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

        this.argument('attributeName', {
            desc: 'Specify attribute name for new decorator',
            type: String,
            required: true
        });

        this.readSettings();
    },

    writing: function () {
        var areaPath = this.getAreaPath(this.area);

        var basePath = path.join(areaPath, 'decorators', this.attributeName);

        // Creating TypeScript code file
        var tsClassName = utils.pascalCaseTagName(this.attributeName);

        this.copyTpl(
            'decorator_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'decorators'),
                attributeName: this.attributeName
            });

        // Creating definition file
        this.writeDefinition(basePath, {
            type: 'decorator',
            ctrl: utils.getTSModuleName(this.appModuleName, this.area, 'decorators', tsClassName)
        });
    }

});