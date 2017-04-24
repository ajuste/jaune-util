"use strict"

{inherits} = require 'util'
Stream = require 'stream'

###*
* @class Write read stream.
###
class WriteReadStream

  constructor: ->

    Stream.call this

    @readable = true
    @writable = true

  ###*
  * @function Write into stream
  ###
  write: -> @emit.apply this, ["data"].concat(Array::slice.call(arguments, 0))

  ###*
  * @function Mark as end.
  ###
  end : -> @emit.apply this, ["end"].concat(Array::slice.call(arguments, 0))

inherits WriteReadStream, Stream

module.exports = {WriteReadStream}
