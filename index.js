'use strict';


module.exports = makeChai;


function makeChai(opts) {
    var chai = require('chai');
    opts = opts || {};
    opts.teardown = opts.teardown || teardown;

    var assert = assertion(chai, chai.assert);

    for (var methodName in chai.assert) {
        var method = chai.assert[methodName];
        if (typeof method == 'function')
            assert[methodName] = assertion(chai.assert, method);
    }

    return {
        assert: assert
    };


    function assertion(context, method) {
        return function _assert() {
            try {
                method.apply(context, arguments);
            } catch(e) {
                console.log(e);
                console.log(e.stack);
                opts.teardown();
            }
        };
    }

    function teardown() {
        phantom.exit(1);
    }
}
