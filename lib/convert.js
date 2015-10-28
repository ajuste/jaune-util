/**
 * @file   Source code for Convert.
 * @author Alvaro Juste
 */
 "use strict";

var Uuid     = require("./uuid").UUID;
var Instance = new Convert();

/**
 * @class Convert constructor
 */
function Convert() { }
Convert.prototype = {
  /**
   * @function Converts to UUID.
   * @param {*} input Input to be convert to UUID.
   * @returns UUID.
   */
  toUUID : function(input) {

    var value = null;

    switch(typeof input) {

      case "string" :
        value = input;
        break;

      case "object" :
        if (input) {
          if (input instanceof Buffer) {
            value = input.toString("hex");
          }
        }
        else {
          value = Uuid.empty();
        }
        break;

      case "undefined" :
        value = Uuid.empty();
        break;
    }
    if (value) {
      return Uuid.parse(value);
    }
    throw new Error("Invalid input");
  },
  /**
   * @function Converts to UUID file format.
   * @param {*} input Input to be convert to UUID.
   * @returns UUID.
   */
  toUUIDPath : function(input) {
    return Uuid.asV4(this.toUUID(input)).toUpperCase();
  },
  /**
   * @function Converts an input to required target type.
   * @param {*} input The input.
   * @param {String} to Name of target type.
   * @returns Required typed value.
   */
  convert : function(input, to) {
    switch(to) {
      case "UUID" :
        return this.toUUID(input);
      case "UUIDPath" :
        return this.toUUIDPath(input);
      default :
        throw new Error("Unsupported target type: " + to);
    }
  }
};
module.exports = {
  Convert : Instance
};
