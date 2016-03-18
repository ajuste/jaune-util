
/**
* @file   Source code for boolean extensions.
* @author Alvaro Juste
 */
"use strict";

/**
* Tries to convert a value to bool
*
* @function
* @param    {*} input Value to convert.
* @returns  {Boolean} The value;
 */
Boolean.parse = function(input) {
  switch (typeof input) {
    case 'boolean':
      return input;
    case 'number':
      if (isNaN(input)) {
        return false;
      } else {
        return input !== 0;
      }
    case 'string':
      if (input.length === 0 || input === '0') {
        return false;
      } else {
        return 'false' !== input.toLowerCase();
      }
    default:
      return !!input;
  }
};
