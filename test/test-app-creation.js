
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

var testHelpers = require('./helpers');

describe('Jasper application creation tests', function(){

    before(function (done) {
        testHelpers.createApp('test app', done);
    });

    it('index.html assertions', function () {

        assert.file('index.html');

        assert.fileContent('index.html', /<h1>test app<\/h1>/);
        assert.fileContent('index.html', /<!-- SCRIPTS -->([\s\S]*)<!-- \/SCRIPTS -->/gim);
        assert.fileContent('index.html', /<!-- STYLES -->([\s\S]*)<!-- \/STYLES -->/gim);

    });

    it('default area configuration', function () {



    });

});