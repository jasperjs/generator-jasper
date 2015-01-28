
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

var testHelpers = require('./helpers');

describe('Jasper application creation tests', function(){

    before(function (done) {
        testHelpers.createApp('test app', done);
    });

    it('Should generate correct index.html file', function () {

        assert.file('index.html');

        assert.fileContent('index.html', /<h1>test app<\/h1>/);
        assert.fileContent('index.html', /<!-- SCRIPTS -->([\s\S]*)<!-- \/SCRIPTS -->/gim);
        assert.fileContent('index.html', /<!-- STYLES -->([\s\S]*)<!-- \/STYLES -->/gim);

        assert.fileContent('index.html', /body ng-app=\"app\"/g);
    });

    it('Should generate config files', function () {
        assert.file([   '.yo-rc.json',
                        'jasper.json',
                        'gruntfile.js',
                        'myApp/bootstrap.js',
                        'typed/angular.d.ts',
                        'typed/jquery.d.ts',
                        'css/base.css']);
    });



});