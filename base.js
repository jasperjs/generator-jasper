'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);

    this.readSettings = function () {
        this.appModuleName = this.config.get('appModuleName');
        this.appPath = this.config.get('appPath');
        this.appModuleName = this.config.get('appModuleName');

        if (!this.appModuleName || !this.appPath || !this.appModuleName) {
            throw 'Configuration of application not found';
        }

    }

    this.copyTpl = function (from, to, context) {
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            context);
    };

    this.getAreaPath = function(areaName){
        return path.join(this.appPath, areaName);
    };

    this.writeDefinition = function(dest, definition){
        var defPath = path.join(dest, '_definition.json');
        this.dest.write(defPath, JSON.stringify(definition, null, '  '));
    };
};