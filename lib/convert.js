
/**
* @file   Source code for Convert.
* @author Alvaro Juste
 */
"use strict";
var asV4, convert, empty, parse, ref, toUUID, toUUIDPath;

ref = require("./uuid").UUID, empty = ref.empty, parse = ref.parse, asV4 = ref.asV4;


/**
* @function Converts to UUID
* @param    {*} input Input to be convert to UUID
* @returns  UUID
 */

toUUID = function(input) {
  var value;
  value = (function() {
    switch (typeof input) {
      case 'string':
        return input;
      case 'object' && input instanceof Buffer:
        return input.toString('hex');
      default:
        return empty();
    }
  })();
  if (value) {
    return parse(value);
  }
  throw new Error('Invalid input');
};


/**
* @function Converts to UUID file format.
* @param    {*} input Input to be convert to UUID
* @returns  UUID
 */

toUUIDPath = function(input) {
  return asV4(toUUID(input)).toUpperCase();
};


/**
* @function Converts an input to required target type.
* @param    {*} input The input.
* @param    {String} to Name of target type.
* @returns  Required typed value.
 */

convert = function(input, to) {
  switch (to) {
    case "UUID":
      return toUUID(input);
    case "UUIDPath":
      return toUUIDPath(input);
    default:
      throw new Error("Unsupported target type: " + to);
  }
};

module.exports = {
  Convert: {
    toUUID: toUUID,
    toUUIDPath: toUUIDPath,
    convert: convert
  }
};
