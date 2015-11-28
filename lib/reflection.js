/**
 * @file   Source code for Reflection utility.
 * @author Alvaro Juste
 */
"use strict";

var _isFunction = require("lodash").isFunction;
var _isObject   = require("lodash").isObject;
var _isString   = require("lodash").isString;
var _chain      = require("lodash").chain;
var _join       = require("path").join;

var INST_REGEX      = /^\[(\w{1})\((.*)\)\]$/;
var GLOBAL_REGEX    = /^\[g\((.*)\)\]$/;
var TOKEN_REQUIRE   = "r";
var TOKEN_MODULE    = "m";
var TOKEN_NAMESPACE = "n";
var TOKEN_CALL      = "c";
var TOKEN_INSTANCE  = "i";

/**
 *  Create an instance of the given constructor with the given arguments.
 *
 * @param   {Function} constructor The constructing function.
 * @param   {Array} args Arguments for the constructor
 * @returns The instance.
 */
function applyNew(constructor, args) {

  var inst = Object.create(constructor.prototype);

  constructor.apply(inst, args);

  return inst;
}
/**
 * @class Builds an instance of the Reflection class.
 */
 var Reflection = function() {};
/**
 * Prototype
 */
Reflection.prototype = {

  createInstance : function(fullName, args, context, globals) {
    var result = this.evaluateNameAndArgs(fullName, args, context, globals);
    return applyNew(result.fn, result.args);
  },
  evaluateNameAndArgs : function(fullName, args, context, globals) {

    var fn                = this.evaluateName(fullName, context, args, globals);
    var resolvedArguments = args;

    if (!_isFunction(fn)) {
      throw new Error("Full name points to invalid function");
    }
    if (_isObject(globals)) {
      resolvedArguments = _chain (args)
                          .map    (e => _isString(e) && e.indexOf("_") === 0 ? globals[e.substring(1)] : e)
                          .value  ();
    }
    return { fn : fn, args : resolvedArguments };
  },
  /*callByName : function(fullName, args, context, globals) {
    debugger
    context = _isString(context) ? this.evaluateName(context) : context;
    var result = this.evaluateNameAndArgs(fullName, args, context, globals);
    return result.fn.apply(context, result.args);
  }*/
  compileExpression : function(expr, context, args, globals) {

    return _chain (expr.split("."))
      .map (function(e) {

        var isOperation = INST_REGEX.test(e);
        var operation   = isOperation ? e.replace(INST_REGEX, "$1") : TOKEN_NAMESPACE;
        var params      = isOperation ? e.replace(INST_REGEX, "$2") : e;

        switch(operation) {

          case TOKEN_CALL     :
          case TOKEN_INSTANCE :

            params = _chain(params.split(","))
              .map    (function(e) { return e.trim(); })
              .filter (function(e) { return !!e; })
              .map    (function(e) {

                var value     = args[e];
                var isGlobal = GLOBAL_REGEX.test(value);

                if (isGlobal) {
                  return globals[value.replace(GLOBAL_REGEX, "$1")];
                }
                return value;
              })
              .value  ();
            break;
        }
        return {params : params, operation : operation};
      });
  },
  executeNode : function(node) {

  },
  evaluateName : function(exprs, args, context, globals) {

    if (typeof exprs !== "string") {
      throw new Error("Full name is not valid");
    }

    var segment = null;
    var root    = context || global;
    var nodes   = this.compileExpression(exprs, context, args || {}, globals);
    var curSegment;

    return _chain  (nodes)
           .reduce (function(obj, e) {

      switch(e.operation) {
        case TOKEN_REQUIRE :
          obj = require(e.params.indexOf("/") !== -1 ? _join(process.cwd(), e.params) : e.params);
          break;
        case TOKEN_MODULE :
          obj = require(e.params);
          break;
        case TOKEN_NAMESPACE :
          obj = obj[e.params];
          break;
        case TOKEN_CALL :
          if (!_isFunction(obj)) {
            throw new Error("Call instruction can only be perfomed on functions");
          }
          obj = obj.apply(undefined, e.params);
          break;
        case TOKEN_INSTANCE :
          if (!_isFunction(obj)) {
            throw new Error("New instruction can only be perfomed on functions");
          }
          obj = applyNew(obj, e.params)
          break;
        default :
          throw new Error("Unsupported node type: " + e.operation);
      }
      if (!obj) {
        throw new Error("Full name points to invalid reference");
      }
      return obj;
    }, root)
    .value ();
  }
};
module.exports = {
  Reflection : new Reflection()
};
