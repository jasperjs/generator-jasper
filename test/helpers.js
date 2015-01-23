var helpers = require('yeoman-generator').test;
var path = require('path');


var TestHelpers =  function(){

    var deps = [
        '../../area',
        '../../component',
        '../../decorator',
        '../../service',
        '../../filter',
        '../../model',
        '../../page'
    ];

    this.createApp = function(appname, done){
        helpers.run(path.join( __dirname, '../app'))
            .inDir(path.join( __dirname, './tmp'))  // Clear the directory and set it as the CWD
            .withArguments([appname, 'myApp', 'myApp'])
            .on('ready', function (generator) {
                // this is called right before `generator.run()` is called
            })
            .withGenerators(deps)
            .on('end', done);
    }
}

module.exports = new TestHelpers();