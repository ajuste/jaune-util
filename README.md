[![Build Status](https://travis-ci.org/ajuste/jaune-util.svg?branch=master)](https://travis-ci.org/ajuste/jaune-util)[![Coverage Status](https://coveralls.io/repos/ajuste/jaune-util/badge.svg?branch=master)](https://coveralls.io/r/ajuste/jaune-util?branch=master)

# jaune-util package

Set of utilities such as reflection, validators and time among others

## Install

```sh
npm install jaune-util
```

## Run tests

```sh
npm test
```

## Reflection

Reflection gives you the possibility to obtain / call / instantiate members with a string expression. This means you don`t need to know prototypes before hand.

### Get a reference by name

You can get a reference by name easily:

```js

var evaluateName = require('jaune-util').Reflection.evaluateName

evaluateName('foo.bar', { foo : { bar : 'my bar' } }); // 'my bar'

```

### Get a reference by requiring a path

Obtain a reference of a module by requering a it`s path. Imagine you have the following tree:

root
|--my_module
|--test

```js

var evaluateName = require('jaune-util').Reflection.evaluateName

evaluateName('r[(/my_module)]'); // my_module exports

```

### Get a reference by requiring a module

Obtain a reference of a module that exists inside your node_modules:

```js

var evaluateName = require('jaune-util').Reflection.evaluateName

evaluateName('m[(/assert)]'); // requires assert module

```

### Get the result by calling a function

You can call a function with a full path; plus you can specify params:

```js

var evaluateName = require('jaune-util').Reflection.evaluateName

evaluateName('foo.fn.c[(p1, p2)]', {foo: { fn: function(arg1, arg2) { return arg1 + arg2; } }, p1: 2, p2: 10 }) // returns 12

```

### Get the result of creating an instance

You can an instance with a full path; plus you can specify params:

```js

var evaluateName = require('jaune-util').Reflection.evaluateName

evaluateName('foo.fn.i[(p1, p2)]', {
  foo: {
    fn: function(arg1, arg2) {
      this.arg1 = arg1 + 10;
      this.arg2 = arg2 + 10;
    }
  },
  p1: 2, p2: 10 }) // returns {arg1: 12, arg2: 20}

```
