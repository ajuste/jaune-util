###*
* @file   Source code for boolean extensions.
* @author Alvaro Juste
###
"use strict";

###*
* Tries to convert a value to bool
*
* @function
* @param    {*} input Value to convert.
* @returns  {Boolean} The value;
###
Boolean.parse = (input) ->
  switch typeof input
    when 'boolean' then input
    when 'number'  then (if isNaN input then no else input isnt 0)
    when 'string'  then (if input.length is 0 or input is '0' then false else 'false' isnt input.toLowerCase())
    else !!input;
