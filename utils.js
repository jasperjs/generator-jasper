var GeneratorUtils = function () {

    this.camelCase = function (name) {
        var regex = /[A-Z]/g;
        return name.replace(regex, function (letter, pos) {
            return pos ? letter : letter.toLowerCase();
        });
    };

    this.camelCaseTagName = function (tagName) {
        if (tagName.indexOf('-') < 0) {
            return this.camelCase(tagName);
        }

        return tagName.replace(/\-(\w)/g, function (match, letter) {
            return letter.toUpperCase();
        });
    };

    this.shakeCase = function (name) {
        var SNAKE_CASE_REGEXP = /[A-Z]/g;
        var separator = '-';
        return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    };

    this.pascalCase = function (source) {
        return source[0].toUpperCase() + source.slice(1);
    };

    this.pascalCaseTagName = function(tagName) {
        var camel = this.camelCaseTagName(tagName);
        return this.pascalCase(camel);
    };

    this.writeFile = function (fs, filename, content) {
        fs.writeFile(filename, '\ufeff' + content, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    this.writeJSON = function (fs, filename, obj) {
        fs.writeFile(filename, '\ufeff' + JSON.stringify(obj, null, '  '), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    this.getTSModuleName = function (appModuleName, area, componentName, className) {
        return appModuleName + '.' + area + '.' + componentName + (className ? '.' + className : '');
    }
};

module.exports = new GeneratorUtils();