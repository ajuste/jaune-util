###*
* @file   Source code for Validator.
* @author Alvaro Juste
###
"use strict"

{UUID} = require './uuid'

# coffeelint: disable=max_line_length
RegExps =
  email : /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, # .ignore
  time : /^(([0-9])|([0-1][0-9])|(2[0-3]))(:(([0-9])|([0-5][0-9]))){1,2}$/,
  defaultStandardDate : /^\d{4}-\d{1,2}-\d{1,2}$/
# coffeelint: enable=max_line_length

###*
* @function Validates if input string is a UUID.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid UUID.
###
isUUID = (input) -> try if input.length in [32, 36] then UUID.parse input

###*
* @function Checks if an email string is valid.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid Email.
###
isEmail = (input) -> RegExps.email.test input

###*
* @function Checks if a string is empty and also trims.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when empty string.
###
isEmptyString = (input) ->
  typeof input is 'string' and input.trim().length is 0

###*
* @function Checks if a input is time.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid time.
###
isTime = (input) -> typeof input is 'string' and RegExps.time.test input

###*
* @function Checks if a input is standard date.
* @param    {*} input The input to validate.
* @returns  {Boolean} True when valid standard date.
###
isStandardDate = (input) ->
  typeof input is 'string' and RegExps.defaultStandardDate.test input

###*
* @function Check if input is a string and length is correct.
* @param    {*} input Input to be validated
* @param    {Number} [maxLength] Max possible length.
* @param    {Object} [opts.canBeEmpty] When true string can be empty.
* @returns  {Boolean} The validation.
###
checkStringLength = (input = '', maxLength, opts = {}) ->

  input ?= ''

  return no unless typeof input is 'string'

  opts.canBeEmpty = false unless typeof opts.canBeEmpty is 'boolean'
  input = input.trim() unless opts.dontTrim

  (opts.canBeEmpty is yes or input.length isnt 0) and input.length <= maxLength

###*
* @function Checks if input is a number and if also if inside bounds.
* @param    {*} input Input to be validated
* @param    {Number} [min] Minimum possible value.
* @param    {Number} [max] Maximum possible value.
* @return   {Boolean} True when valid.
###
isNumber = (input, min, max) ->
  min = min ? Number.MIN_VALUE unless min is 0
  max = max ? Number.MAX_VALUE unless max is 0
  typeof input is 'number' and not isNaN(input) and input >= min and
  input <= max

###*
* @function Validates if it's a valid boolean convertible type.
* @param    {*} input Input
* @returns  {Boolean} True when convertible to boolean.
###
isBoolean = (input) -> typeof input isnt 'undefined'

###*
* @function Validates if it's a valid string.
* @param    {*} input Input
* @param    {Boolean} [canBeNull] True when input can be null.
* @param    {Boolean} [canBeUndefined] True when input can be undefined.
* @returns  {Boolean} True when valid string.
###
isString = (input, canBeNull, canBeUndefined) ->
  typeof input is 'string' or canBeNull is yes and
  input is null or canBeUndefined is true and typeof input is 'undefined'

###*
* @function Validates if it's a valid object.
* @param    {*} input Input
* @param    {Boolean} [canBeNull] True when input can be null.
* @param    {Boolean} [canBeUndefined] True when input can be undefined.
* @returns  {Boolean} True when valid object.
###
isObject = (input, canBeNull, canBeUndefined) ->
  typeof input is 'object' or input is null and
  canBeNull is yes or typeof input is 'undefined' and canBeUndefined is yes

###*
* @function Validates if it's a array
* @param    {*} input Input
* @param    {Boolean} [canBeEmpty] True when array can be empty
* @returns  {Boolean} True when valid array.
###
isArray = (input, canBeEmpty) -> input instanceof Array and
  (input.length isnt 0 or canBeEmpty is yes)

###*
* @function Validates if it's a valid function.
* @param    {*} input Input
* @param    {Number} [numberOfArguments] Number of arguments the function
*           must have.
* @returns  {Boolean} True when valid object.
###
isFunction = (input, numberOfArguments) ->
  typeof input is 'function' and (not isNumber(numberOfArguments) or
  input.length is numberOfArguments)

###*
* @function Validates if it's a valid date.
* @param    {*} input Input
* @returns  {Boolean} True when valid date.
###
isDate = (input) ->
  (isNumber(input) or isString(input) or input instanceof Date) and
  not isNaN(new Date(input).getTime())

module.exports =
  Validator : {
    isUUID, isEmail, isEmptyString, isTime, isStandardDate, checkStringLength,
    isNumber, isBoolean, isString, isObject, isArray, isFunction, isDate}
