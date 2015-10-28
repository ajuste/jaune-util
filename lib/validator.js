/**
 * @file   Source code for Validator.
 * @author Alvaro Juste
 */
"use strict";

var UUID     = require("./uuid").UUID;
var RegExps  = {
  email : /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
  time : /^(([0-9])|([0-1][0-9])|(2[0-3]))(:(([0-9])|([0-5][0-9]))){1,2}$/,
  defaultStandardDate : /^\d{4}-\d{1,2}-\d{1,2}$/
};

/**
 * @class Validator utility class.
 */
function Validator() {}
Validator.prototype = {
  /**
   * @function Validates if input string is a UUID.
   * @param {*} input The input to validate.
   * @returns {Boolean} True when valid UUID.
   */
  isUUID : function(input) {
    try {
      return 32 === input.length || 36 === input.length ? UUID.parse(input) : null;
    }
    catch (err) {
      return null;
    }
  },
  /**
    * @function Checks if an email string is valid.
    * @param {*} input The input to validate.
    * @returns {Boolean} True when valid Email.
    */
  isEmail : function(input) {
    return RegExps.email.test(input);
  },
  /**
  * @function Checks if a string is empty and also trims.
  * @param {*} input The input to validate.
  * @returns {Boolean} True when empty string.
  */
  isEmptyString : function(input) {
    return "string" === typeof input && 0 === input.trim().length;
  },
  /**
  * @function Checks if a input is time.
  * @param {*} input The input to validate.
  * @returns {Boolean} True when valid time.
  */
  isTime : function(input) {
    return "string" === typeof input && RegExps.time.test(input);
  },
  /**
  * @function Checks if a input is standard date.
  * @param {*} input The input to validate.
  * @returns {Boolean} True when valid standard date.
  */
  isStandardDate : function(input) {
    return "string" === typeof input && RegExps.defaultStandardDate.test(input);
  },
  /**
   * @function Check if input is a string and length is correct.
   * @param {*} input Input to be validated
   * @param {Number} [maxLength] Max possible length.
   * @param {Object} [opts.canBeEmpty] When true string can be empty.
   * @returns {Boolean} The validation.
   */
  checkStringLength : function(input, maxLength, opts) {

    opts = opts || {};
    input = input || "";

    if ("string" !== typeof input) {
      return false;
    }
    if ("boolean" !== typeof opts.canBeEmpty) {
      opts.canBeEmpty = false;
    }
    if (opts.dontTrim !== true) {
      input = input.trim();
    }
    return (opts.canBeEmpty === true || input.length !== 0 ) && input.length <= maxLength;
  },
  /**
    * @function Checks if input is a number and if also if inside bounds.
    * @param {*} input Input to be validated
    * @param {Number} [min] Minimum possible value.
    * @param {Number} [max] Maximum possible value.
    * @return {Boolean} True when valid.
    */
  isNumber : function(input, min, max) {
    min = min === 0 ? 0 : min || Number.MIN_VALUE;
    max = max === 0 ? 0 : max || Number.MAX_VALUE;

    return "number" === typeof input && !isNaN(input) && input >= min && input <= max;
  },
  /**
   * @function Validates if it's a valid boolean convertible type.
   * @param {*} input Input
   * @returns {Boolean} True when convertible to boolean.
   */
  isBoolean : function(input) {
    return "undefined" !== typeof input;
  },
  /**
   * @function Validates if it's a valid string.
   * @param {*} input Input
   * @param {Boolean} [canBeNull] True when input can be null.
   * @param {Boolean} [canBeUndefined] True when input can be undefined.
   * @returns {Boolean} True when valid string.
   */
  isString : function(input, canBeNull, canBeUndefined) {
    return ("string" === typeof input) || (true === canBeNull && null === input) || (true === canBeUndefined && "undefined" === typeof input);
  },
  /**
   * @function Validates if it's a valid object.
   * @param {*} input Input
   * @param {Boolean} [canBeNull] True when input can be null.
   * @param {Boolean} [canBeUndefined] True when input can be undefined.
   * @returns {Boolean} True when valid object.
   */
  isObject : function(input, canBeNull, canBeUndefined) {
    return "object" === typeof input || (null === input && true === canBeNull) || ("undefined" === typeof input && true === canBeUndefined);
  },
  /**
   * @function Validates if it's a array
   * @param {*} input Input
   * @param {Boolean} [canBeEmpty] True when array can be empty
   * @returns {Boolean} True when valid array.
   */
  isArray : function(input, canBeEmpty) {
    return input instanceof Array && (0 !== input.length || true === canBeEmpty);
  },
  /**
   * @function Validates if it's a valid function.
   * @param {*} input Input
   * @param {Number} [numberOfArguments] Number of arguments the function must have.
   * @returns {Boolean} True when valid object.
   */
  isFunction : function(input, numberOfArguments) {
    return "function" === typeof input && (!this.isNumber(numberOfArguments) || input.length === numberOfArguments);
  },
  /**
   * @function Validates if it's a valid date.
   * @param {*} input Input
   * @returns {Boolean} True when valid date.
   */
  isDate : function(input) {
    return (this.isNumber(input) || this.isString(input) || input instanceof Date) && !isNaN(new Date(input).getTime());
  }
};
module.exports = {
  Validator : new Validator()
};
