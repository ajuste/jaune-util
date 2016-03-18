###*
* @file   Source code for UUID.
* @author Alvaro Juste
###
"use strict";

Uuid = require "node-uuid"

###*
* @function Create a new uuid.
* @param {Buffer} [buffer] Where to put the uuid
* @returns {Buffer} The buffer with the uuid
###
create = (buffer) -> Uuid.v4 {}, buffer || new Buffer(16)

###*
* @function Create a short uuid
* @returns {String} The short uuid
###
createShort = -> "0000#{(Math.random() * Math.pow(36,4) << 0).toString(36)}".slice(-4)

###*
* @function Creates a new uuid in plain text as hexadecimal
* @returns {String} The new uuid
###
plain = -> @asPlain @create()

###*
* @function Creates a new short uuid in plain text as hexadecimal
* @returns {String} The new uuid
###
shortPlain = -> @asPlain @createShort()

###*
* @function Returns the uuid as plain text with specified encoding
* @param {Buffer} uuid The uuid to print as text
* @param {String} [encoding] The desired encoding. Will default to hex.
* @returns {String} The new uuid as plain
###
asPlain = (uuid, encoding) -> uuid.toString(encoding ? 'hex').replace(/-/g, '')

asV4 = (val) ->
  value = val ? @create()
  Uuid.unparse if typeof val is "string" then parse(val) else val

###*
* @function Parses a uuid string
* @param {Buffer} [buffer] Where to put the uuid
* @param {String} uuid The UUID string to be parsed
* @returns {Buffer} The buffer with the uuid
###
parse = (input, buffer) -> Uuid.parse input, buffer ? new Buffer(16)

###*
* @function Evaluates if two uuid are equal
* @param {Buffer} uuid1 First uuid.
* @param {Buffer} uuid2 Second uuid.
* @returns {Boolean} True when equal
###
equal = (uuid1, uuid2) -> uuid1.toString().toLowerCase() is uuid2.toString().toLowerCase()

###*
* @function Returns an empty uuid
* @param {Buffer} [buffer] Where to put the uuid
* @returns {Buffer} The buffer with the uuid
###
empty = (buffer) -> parse "00000000-0000-0000-0000-000000000000", buffer

module.exports =
  UUID : {create, createShort, plain, shortPlain, asPlain, asV4, parse, equal,
    empty}
