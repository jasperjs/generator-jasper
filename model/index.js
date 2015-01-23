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

        this.argument('className', {
            desc: 'Specify class name',
            type: String,
            required: true
        });
        this.readSettings();
    },


    writing: function () {
        var areaPath = this.getAreaPath(this.area);
        var basePath = path.join(areaPath, 'models');

        // Creating TypeScript code file
        var tsClassName = utils.pascalCaseTagName(this.className);
        this.copyTpl(
            'model_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'models')
            })

    }

});