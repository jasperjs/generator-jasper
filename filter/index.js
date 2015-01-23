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

        this.argument('filterName', {
            desc: 'Specify filter name',
            type: String,
            required: true
        });

        this.readSettings();
    },

    writing: function () {
        var areaPath = this.getAreaPath(this.area);

        this.filterName = utils.pascalCaseTagName(this.filterName);

        var basePath = path.join(areaPath, 'filters', this.filterName);

        var tsClassName = this.filterName;

        var filterName = utils.camelCase(this.filterName);
        // Creating TypeScript code file
        this.copyTpl(
            'filter_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'filters'),
                filterName: filterName
            });

        // Creating definition file
        this.writeDefinition(basePath, {
            type: 'filter',
            name: filterName,
            ctor: utils.getTSModuleName(this.appModuleName, this.area, 'filters', tsClassName)
        });

    }

});