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

        this.argument('serviceName', {
            desc: 'Specify service name',
            type: String,
            required: true
        });

        this.readSettings();

    },

    writing: function () {
        this.serviceName = utils.pascalCaseTagName(this.serviceName);

        var areaPath = this.getAreaPath(this.area);
        var basePath = path.join(areaPath, 'services', this.serviceName);

        // Creating TypeScript code file
        var tsClassName = this.serviceName;

        this.copyTpl(
            'service_ts.tmpl',
            path.join(basePath, tsClassName + '.ts'),
            {
                className: tsClassName,
                module: utils.getTSModuleName(this.appModuleName, this.area, 'services'),
                serviceName: this.serviceName
            });

        //Creating definition file
        this.writeDefinition(basePath, {
            type: 'service',
            name: tsClassName,
            ctor: utils.getTSModuleName(this.appModuleName, this.area, 'services', tsClassName)
        });

    }

});