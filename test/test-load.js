'use strict';

var assert = require('yeoman-generator').assert;

describe('Jasper generator load test', function () {
    it('can be imported without blowing up', function () {
        assert(require('../app') !== undefined);
        assert(require('../service') !== undefined);
        assert(require('../decorator') !== undefined);
        assert(require('../component') !== undefined);
        assert(require('../filter') !== undefined);
        assert(require('../area') !== undefined);
        assert(require('../page') !== undefined);
        assert(require('../model') !== undefined);
        assert(require('../utils') !== undefined);
    });
});