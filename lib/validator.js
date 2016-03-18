
/**
* @file   Source code for Validator.
* @author Alvaro Juste
 */
"use strict";
var RegExps, UUID, checkStringLength, isArray, isBoolean, isDate, isEmail, isEmptyString, isFunction, isNumber, isObject, isStandardDate, isString, isTime, isUUID;

UUID = require('./uuid').UUID;

RegExps = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
  time: /^(([0-9])|([0-1][0-9])|(2[0-3]))(:(([0-9])|([0-5][0-9]))){1,2}$/,
  defaultStandardDate: /^\d{4}-\d{1,2}-\d{1,2}$/
};


/**
* @function Validates if input string is a UUID.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid UUID.
 */

isUUID = function(input) {
  var ref;
  try {
    if ((ref = input.length) === 32 || ref === 36) {
      return UUID.parse(input);
    }
  } catch (undefined) {}
};


/**
* @function Checks if an email string is valid.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid Email.
 */

isEmail = function(input) {
  return RegExps.email.test(input);
};


/**
* @function Checks if a string is empty and also trims.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when empty string.
 */

isEmptyString = function(input) {
  return typeof input === 'string' && input.trim().length === 0;
};


/**
* @function Checks if a input is time.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid time.
 */

isTime = function(input) {
  return typeof input === 'string' && RegExps.time.test(input);
};


/**
* @function Checks if a input is standard date.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid standard date.
 */

isStandardDate = function(input) {
  return typeof input === 'string' && RegExps.defaultStandardDate.test(input);
};


/**
* @function Check if input is a string and length is correct.
* @param    {*} input Input to be validated
* @param    {Number} [maxLength] Max possible length.
* @param    {Object} [opts.canBeEmpty] When true string can be empty.
* @returns  {Boolean} The validation.
 */

checkStringLength = function(input, maxLength, opts) {
  if (input == null) {
    input = '';
  }
  if (opts == null) {
    opts = {};
  }
  if (input == null) {
    input = '';
  }
  if (typeof input !== 'string') {
    return false;
  }
  if (typeof opts.canBeEmpty !== 'boolean') {
    opts.canBeEmpty = false;
  }
  if (!opts.dontTrim) {
    input = input.trim();
  }
  return (opts.canBeEmpty === true || input.length !== 0) && input.length <= maxLength;
};


/**
* @function Checks if input is a number and if also if inside bounds.
* @param    {*} input Input to be validated
* @param    {Number} [min] Minimum possible value.
* @param    {Number} [max] Maximum possible value.
* @return   {Boolean} True when valid.
 */

isNumber = function(input, min, max) {
  if (min !== 0) {
    min = min != null ? min : Number.MIN_VALUE;
  }
  if (max !== 0) {
    max = max != null ? max : Number.MAX_VALUE;
  }
  return typeof input === 'number' && !isNaN(input) && input >= min && input <= max;
};


/**
* @function Validates if it's a valid boolean convertible type.
* @param    {*} input Input
* @returns  {Boolean} True when convertible to boolean.
 */

isBoolean = function(input) {
  return typeof input !== 'undefined';
};


/**
* @function Validates if it's a valid string.
* @param    {*} input Input
* @param    {Boolean} [canBeNull] True when input can be null.
* @param    {Boolean} [canBeUndefined] True when input can be undefined.
* @returns  {Boolean} True when valid string.
 */

isString = function(input, canBeNull, canBeUndefined) {
  return typeof input === 'string' || canBeNull === true && input === null || canBeUndefined === true && typeof input === 'undefined';
};


/**
* @function Validates if it's a valid object.
* @param    {*} input Input
* @param    {Boolean} [canBeNull] True when input can be null.
* @param    {Boolean} [canBeUndefined] True when input can be undefined.
* @returns  {Boolean} True when valid object.
 */

isObject = function(input, canBeNull, canBeUndefined) {
  return typeof input === 'object' || input === null && canBeNull === true || typeof input === 'undefined' && canBeUndefined === true;
};


/**
* @function Validates if it's a array
* @param    {*} input Input
* @param    {Boolean} [canBeEmpty] True when array can be empty
* @returns  {Boolean} True when valid array.
 */

isArray = function(input, canBeEmpty) {
  return input instanceof Array && (input.length !== 0 || canBeEmpty === true);
};


/**
* @function Validates if it's a valid function.
* @param    {*} input Input
* @param    {Number} [numberOfArguments] Number of arguments the function must have.
* @returns  {Boolean} True when valid object.
 */

isFunction = function(input, numberOfArguments) {
  return typeof input === 'function' && (!isNumber(numberOfArguments) || input.length === numberOfArguments);
};


/**
* @function Validates if it's a valid date.
* @param    {*} input Input
* @returns  {Boolean} True when valid date.
 */

isDate = function(input) {
  return (isNumber(input) || isString(input) || input instanceof Date) && !isNaN(new Date(input).getTime());
};

module.exports = {
  Validator: {
    isUUID: isUUID,
    isEmail: isEmail,
    isEmptyString: isEmptyString,
    isTime: isTime,
    isStandardDate: isStandardDate,
    checkStringLength: checkStringLength,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isString: isString,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    isDate: isDate
  }
};
