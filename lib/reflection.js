
/**
* @file   Source code for Reflection utility.
* @author Alvaro Juste
 */
'use strict';
var GLOBAL_REGEX, INST_REGEX, TOKEN_CALL, TOKEN_INSTANCE, TOKEN_MODULE, TOKEN_NAMESPACE, TOKEN_REQUIRE, applyNew, compileExpression, createInstance, evaluateName, evaluateNameAndArgs, executeNode, join;

join = require('path').join;

INST_REGEX = /^\[(\w{1})\((.*)\)\]$/;

GLOBAL_REGEX = /^\[g\((.*)\)\]$/;

TOKEN_REQUIRE = 'r';

TOKEN_MODULE = 'm';

TOKEN_NAMESPACE = 'n';

TOKEN_CALL = 'c';

TOKEN_INSTANCE = 'i';


/**
* Create an instance of the given constructor with the given arguments.
* @param   {Function} constructor The constructing function.
* @param   {Array} args Arguments for the constructor
* @returns The instance.
 */

applyNew = function(constructor, args) {
  var inst;
  inst = Object.create(constructor.prototype);
  constructor.apply(inst, args);
  return inst;
};


/**
* @function Creates an instance of the given name
* @param    {String} fullName The name of the reference to be looked up
* @param    {Object} [args] Arguments for the function
* @param    {Object} [context] Initial search point for look up
* @param    {Object} [globals] References that might be required in look up
* @returns  {Object} Instantiated object
 */

createInstance = function(fullName, args, context, globals) {
  var fn, ref;
  ref = evaluateNameAndArgs(fullName, args, context, globals), fn = ref.fn, args = ref.args;
  return applyNew(fn, args);
};


/**
* @function Evaluates a function and its arguments
* @param    {String} fullName The name of the reference to be looked up
* @param    {Object} [args] Arguments for the function
* @param    {Object} [context] Initial search point for look up
* @param    {Object} [globals] References that might be required in look up
* @returns  {Object} Object with function and arguments
 */

evaluateNameAndArgs = function(fullName, args, context, globals) {
  var fn, resolvedArguments;
  if (args == null) {
    args = [];
  }
  fn = evaluateName(fullName, context, args, globals);
  resolvedArguments = args;
  if (typeof fn !== 'function') {
    throw new Error("Full name points to invalid function " + fullName);
  }
  if (typeof globals === 'object') {
    resolvedArguments = args.map(function(e) {
      if (typeof e === 'string' && e.indexOf('_') === 0) {
        return globals[e.substring(1)];
      } else {
        return e;
      }
    });
  }
  return {
    fn: fn,
    args: resolvedArguments
  };
};


/**
* @function Returns a compiled expression
* @param    {String} expr The name of the reference to be compiled
* @param    {Object} [args] Arguments for the function
* @param    {Object} [globals] References that might be required in look up
* @returns  {Array}  Compiled nodes
 */

compileExpression = function(expr, args, globals) {
  if (args == null) {
    args = {};
  }
  if (globals == null) {
    globals = {};
  }
  return expr.split('.').map(function(e) {
    var isOperation, operation, param, params, value;
    isOperation = INST_REGEX.test(e);
    operation = (isOperation ? e.replace(INST_REGEX, '$1') : TOKEN_NAMESPACE);
    params = isOperation ? e.replace(INST_REGEX, '$2') : e;
    switch (operation) {
      case TOKEN_CALL:
      case TOKEN_INSTANCE:
        params = (function() {
          var i, len, ref, results;
          ref = params.split(',');
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            param = ref[i];
            if (!(param = param.trim()).length) {
              continue;
            }
            value = args[param];
            if (GLOBAL_REGEX.test(value)) {
              results.push(globals[value.replace(GLOBAL_REGEX, '$1')]);
            } else {
              results.push(value);
            }
          }
          return results;
        })();
    }
    return {
      params: params,
      operation: operation
    };
  });
};

executeNode = function(current, node) {
  var operation, params;
  operation = node.operation, params = node.params;
  switch (operation) {
    case TOKEN_REQUIRE:
      node = require(params.indexOf('/') !== -1 ? join(process.cwd(), params) : params);
      break;
    case TOKEN_MODULE:
      node = require(params);
      break;
    case TOKEN_NAMESPACE:
      node = current[params];
      break;
    case TOKEN_CALL:
      if (typeof current !== 'function') {
        throw new Error('Call instruction can only be perfomed on functions');
      }
      node = current.apply(void 0, params);
      break;
    case TOKEN_INSTANCE:
      if (typeof current !== 'function') {
        throw new Error('New instruction can only be perfomed on functions');
      }
      node = applyNew(current, node.params);
      break;
    default:
      throw new Error("Unsupported node type: " + operation);
  }
  if (!node) {
    throw new Error('Full name points to invalid reference');
  }
  return node;
};

evaluateName = function(exprs, args, context, globals) {
  if (typeof exprs !== 'string') {
    throw new Error('Expression should be a string');
  }
  return compileExpression(exprs, args, globals).reduce(executeNode, context != null ? context : global);
};

module.exports = {
  Reflection: {
    createInstance: createInstance,
    evaluateNameAndArgs: evaluateNameAndArgs,
    compileExpression: compileExpression,
    evaluateName: evaluateName,
    executeNode: executeNode
  }
};
