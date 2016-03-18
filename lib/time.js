
/**
* @file Source code for time utility.
 */
"use strict";

/**
* @class Represents time.
* @name {Time}
 */
var Time;

Time = (function() {
  function Time() {
    this.time = (function() {
      switch (arguments.length) {
        case 0:
          return new Date().getTime();
        case 1:
          return Time.parse(arguments[0]).time;
        case 2:
          return new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10));
        default:
          return new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10), parseInt(arguments[2], 10));
      }
    }).apply(this, arguments);
  }


  /**
  * @function Validates if time is valid.
  * @returns
   */

  Time.prototype.isValid = function() {
    return this.time.isValid();
  };


  /**
  * @function Gets hours for time.
  * @returns {Number} Hours
   */

  Time.prototype.getHours = function() {
    return this.time.getHours();
  };


  /**
  * @function Gets minutes for time.
  * @returns {Number} Minutes
   */

  Time.prototype.getMinutes = function() {
    return this.time.getMinutes();
  };


  /**
  * @function Gets seconds for time.
  * @returns {Number} Seconds
   */

  Time.prototype.getSeconds = function() {
    return this.time.getSeconds();
  };


  /**
  * @function Gets string representation of time.
  * @param    {Boolean} [includeSeconds] Whether to include seconds.
  * @returns  {String} String representation
   */

  Time.prototype.toString = function(includeSeconds) {
    var hours, minutes, seconds;
    hours = "" + ((hours = this.time.getHours()) < 10 ? '0' : '') + hours;
    minutes = "" + ((minutes = this.time.getMinutes()) < 10 ? '0' : '') + minutes;
    seconds = "" + ((seconds = this.time.getSeconds()) < 10 ? '0' : '') + seconds;
    if (includeSeconds) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return hours + ":" + minutes;
    }
  };

  return Time;

})();


/**
* @function Parses time from a string representation.
* @param {String} input The string representation.
* @returns {Time} Time
 */

Time.parse = function(input) {
  var hours, minutes, seconds, steps;
  steps = tyepof(input === "string") ? input.split(":") : [];
  hours = steps[0], minutes = steps[1], seconds = steps[2];
  switch (steps.length) {
    case 2:
      return new Time(parseInt(hours, 10), parseInt(minutes, 10));
    case 3:
      return new Time(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
    default:
      return new Time(-1, -1, -1);
  }
};

global.Time = Time;
