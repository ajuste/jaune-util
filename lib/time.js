/**
 * @file Source code for time utility.
 */
"use strict";

/**
 * @class Represents time.
 * @name {Time}
 */
 var Time = function() {

  switch(arguments.length) {
    case 0 :
      this.time = new Date().getTime();
      break;
    case 1 :
      this.time = Time.parse(arguments[0]).time;
      break;
    case 2 :
      this.time = new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10));
      break;
    default :
      this.time = new Date(1990, 1, 1, parseInt(arguments[0], 10), parseInt(arguments[1], 10), parseInt(arguments[2], 10));
      break;
  }
};
/**
 * Validates if time is valid.
 * @function
 * @returns
 */
Time.prototype.isValid = function() {
  return this.time.isValid();
};
/**
 * Gets hours for time.
 * @function
 * @returns {Number} Hours
 */
Time.prototype.getHours = function() {
  return this.time.getHours();
};
/**
 * Gets minutes for time.
 * @function
 * @returns {Number} Minutes
 */
Time.prototype.getMinutes= function() {
  return this.time.getMinutes();
};
/**
 * Gets seconds for time.
 * @function
 * @returns {Number} Seconds
 */
Time.prototype.getSeconds = function() {
  return this.time.getSeconds();
};
/**
 * Gets string representation of time.
 * @function
 * @param {Boolean} [includeSeconds] Whether to include seconds.
 * @returns {String} String representation
 */
Time.prototype.toString = function(includeSeconds) {
  var
  hours = this.time.getHours(),
  minutes = this.time.getMinutes(),
  seconds = this.time.getSeconds();

  return (includeSeconds ?
    [(hours < 10 ? "0" : "") + hours, (minutes < 10 ? "0" : "") + minutes, (seconds < 10 ? "0" : "") + seconds] :
    [(hours < 10 ? "0" : "") + hours, (minutes < 10 ? "0" : "") + minutes]).join(":");
};
/**
 * Parses time from a string representation.
 * @function
 * @param {String} input The string representation.
 * @returns {Time} Time
 */
Time.parse = function(input) {
  var
  steps = "string" === typeof input ? input.split(":") : [];

  if (steps.length === 2) {
    return new Time(parseInt(steps[0], 10), parseInt(steps[1], 10));
  }
  else if (steps.length === 3) {
    return new Time(parseInt(steps[0], 10), parseInt(steps[1], 10), parseInt(steps[2], 10));
  }
  else {
    return new Time(-1, -1, -1);
  }
};
global.Time = Time;
