###*
* @file   Source code for Convert.
* @author Alvaro Juste
###
"use strict";

{empty, parse, asV4} = require("./uuid").UUID

###*
* @function Converts to UUID
* @param    {*} input Input to be convert to UUID
* @returns  UUID
###
toUUID = (input) ->

  value =
    switch typeof input

      when 'string' then input

      when 'object' and input instanceof Buffer then input.toString 'hex'

      else empty()

  return parse value if value

  throw new Error 'Invalid input'

###*
* @function Converts to UUID file format.
* @param    {*} input Input to be convert to UUID
* @returns  UUID
###
toUUIDPath = (input) -> asV4(toUUID(input)).toUpperCase()

###*
* @function Converts an input to required target type.
* @param    {*} input The input.
* @param    {String} to Name of target type.
* @returns  Required typed value.
###
convert = (input, to) ->

  switch to

    when "UUID" then toUUID input

    when "UUIDPath" then toUUIDPath input

    else throw new Error "Unsupported target type: #{to}"

module.exports = Convert : {toUUID, toUUIDPath, convert}
