var generators = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var utils = require('../utils');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.argument('area', {
            desc: 'Specify area name to place new component',
            type: String,
            required: true
        });

    },

    check: function () {

        this.appModuleName = this.config.get('appModuleName');
        this.appPath = this.config.get('appPath');
        this.appModuleName = this.config.get('appModuleName');

        if(!this.appModuleName || !this.appPath || !this.appModuleName)
        {
            throw 'Configuration of application not found';
        }

        this.area = this.area.replace(/\-/g, '_');
        this.area = this.area.replace(/[\:,\.,\_,\-,\\,\/,\?,\=,\#,\!,\+,\$,\*,\%,\@,\&,\{,\}]+/g, '');

        if (!this.area.length) {
            this.log.error(
                'Please specify correct area name.' +
                '\n'
            );
            return;
        }

        this.defPath = path.join(this.destinationRoot(), this.appPath, this.area, '_area.json');
        if (this.fs.exists(this.defPath)) {
            this.log.error(
                'Area \"' + this.area + '\" allready exists at \"' + this.defPath + '\".' +
                '\n'
            );
            return;
        }

    },


    writing: function () {
        // Creating definition file
        var definitionObj = {
            name: this.area,
            dependencies: []
        };
        this.fs.write(this.defPath, JSON.stringify(definitionObj, null,'  '));
    }

});