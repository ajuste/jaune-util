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

var RegExp = {
  requireToken : /^\[(\w{1})\((.+)\)\]/
};
var Tokens = {
  Require   : "r",
  Module    : "m",
  Namespace : "n"
};
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

    var fn                = this.evaluateName(fullName, context);
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
  callByName : function(fullName, args, context, globals) {
    context = _isString(context) ? this.evaluateName(context) : context;
    var result = this.evaluateNameAndArgs(fullName, args, context, globals);
    return result.fn.apply(context, result.args);
  },
  evaluateName : function(fullName, context) {

    if (typeof fullName !== "string") {
      throw new Error("Full name is not valid");
    }

    var segment        = null;
    var root           = context || global;
    var segments       = [];
    var requireSegment = RegExp.requireToken.exec(fullName);
    var curSegment;

    if (requireSegment) {
      segments.push({
        type : requireSegment[1],
        name : requireSegment[2]
      });
      fullName = fullName.replace(RegExp.requireToken, "");
    }
    _chain   (fullName.split("."))
    .filter  (function(e) { return !!e; })
    .forEach (function(e) { segments.push({ type : Tokens.Namespace, name : e }); })
    .value   ();

    return _chain  (segments)
           .reduce (function(obj, e) {

      switch(e.type) {
        case Tokens.Require :
          obj = require(e.name.indexOf("/") !== -1 ? _join(process.cwd(), e.name) : e.name);
          break;
        case Tokens.Module :
          obj = require(e.name);
          break;
        case Tokens.Namespace :
          obj = obj[e.name];
          break;
        default :
          throw new Error("Unsupported segment type: " + e.type);
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
