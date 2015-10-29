/**
 * @file   Source code for boolean extensions.
 * @author Alvaro Juste
 */
"use strict";

/**
 * Tries to convert a value to bool
 * @function
 * @param {*} input Value to convert.
 * @returns {Boolean} The value;
 */
Boolean.parse = function(input) {
  switch(typeof input) {
    case "boolean" :
      return input;
    case "number" :
      return isNaN(input) ? false : 0 !== input;
    case "string" :
      return 0 === input.length || "0" == input ? false : "false" !== input.toLowerCase();
    default :
      return !!input;
  }
};
