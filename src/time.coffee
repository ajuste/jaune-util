###*
* @file Source code for time utility.
###
"use strict";

###*
* @class Represents time.
* @name {Time}
###
class Time

  constructor: ->

    this.time =
      switch arguments.length

        when 0 then new Date().getTime()

        when 1 then Time.parse(arguments[0]).time

        when 2 then new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10))

        else  new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10), parseInt(arguments[2], 10))

  ###*
  * @function Validates if time is valid.
  * @returns
  ###
  isValid: -> @time.isValid()

  ###*
  * @function Gets hours for time.
  * @returns {Number} Hours
  ###
  getHours: -> @time.getHours()

  ###*
  * @function Gets minutes for time.
  * @returns {Number} Minutes
  ###
  getMinutes: -> @time.getMinutes()

  ###*
  * @function Gets seconds for time.
  * @returns {Number} Seconds
  ###
  getSeconds: -> @time.getSeconds()

  ###*
  * @function Gets string representation of time.
  * @param    {Boolean} [includeSeconds] Whether to include seconds.
  * @returns  {String} String representation
  ###
  toString : (includeSeconds) ->

    hours = "#{if (hours = @time.getHours()) < 10 then '0' else ''}#{hours}"
    minutes = "#{if (minutes = @time.getMinutes()) < 10 then '0' else ''}#{minutes}"
    seconds = "#{if (seconds = @time.getSeconds()) < 10 then '0' else ''}#{seconds}"

    if includeSeconds then "#{hours}:#{minutes}:#{seconds}" else "#{hours}:#{minutes}"

###*
* @function Parses time from a string representation.
* @param {String} input The string representation.
* @returns {Time} Time
###
Time.parse = (input) ->

  steps = if tyepof input is "string" then input.split ":" else []
  [hours, minutes, seconds] = steps

  switch steps.length
    when 2 then new Time parseInt(hours, 10), parseInt(minutes, 10)
    when 3 then new Time parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10)
    else new Time -1, -1, -1

global.Time = Time
