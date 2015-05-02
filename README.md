# phantom-chai

Chai assertions for phantomjs scripts

## Usage

npm install phantom-chai chai --save-dev


## Usage in phantomjs script

```
    var chai = require('phantom-chai')()
        , assert = chai.assert;

    var page = webpage.create();

    page.open('http://localhost/test', function (status) {
        assert.equal(status, 'success');
        assert.equal(page.title, 'My page');
        phantom.exit();
    });

```

If any of the assertions throws, script will log the error and the stack and will terminate. Internally `phantom.exit(1)` is called.

You can pass custom teardown function in options, e.g. to delete test data and to kill child processes:

```
    var chai = require('phantom-chai')({ teardown: teardown });

    function teardown() {
        childProcess.kill('SIGKILL');
        phantom.exit(1);
    }
```

At the moment only 'assert' style assertions are supported.


## Dependencies

chai is NOT a dependency of phantom-chai, it should be installed separately.

It allows you using any version of chai with phantom-chai and upgrading chai without upgading phantom-chai.
