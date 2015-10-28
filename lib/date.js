/**
 * @file   Source code for Date extensions.
 * @author Alvaro Juste
 */
"use strict";

const UnitMult = {
  "century"     : 3153600000000,
  "decade"      : 315360000000,
  "year"        : 31536000000,
  "quarter"     : 7776000000,
  "month"       : 2592000000,
  "day"         : 86400000,
  "hour"        : 3600000,
  "minute"      : 60000,
  "second"      : 1000,
  "millisecond" : 1
};
/**
 * @function Adds seconds to date.
 * @param    {Number} seconds Seconds to add.
 * @return   {Date} New date
 */
Date.prototype.addSeconds = function(seconds) {
  return new Date(this.getTime() + 1000 * seconds);
};
/**
 * @function Adds minutes to date.
 * @param    {Number} minutes Minutes to add.
 * @return   {Date} New date
 */
Date.prototype.addMinutes = function(minutes) {
  return new Date(this.getTime() + 60000 * minutes);
};
/**
 * @function Adds hours to date.
 * @param    {Number} hours Hours to add.
 * @return   {Date} New date
 */
Date.prototype.addHours = function(hours) {
  return new Date(this.getTime() + 3600000 * hours);
};
/**
 * @function Adds days to date.
 * @param    {Number} days Days to add.
 * @return   {Date} New date
 */
Date.prototype.addDays = function(days) {
  return new Date(this.getTime() + 86400000 * days);
};
/**
 * @function Calculates the difference in seconds between two dates.
 * @param    {Date} date The other date
 * @return   {Number} Difference
 */
Date.prototype.differenceInSeconds = function(date) {
  var
  diff = (this.getTime() - date.getTime()) / 1000;
  return parseInt(diff < 0 ? 0 : diff, 10).toString(10);
};
/**
 * @function Calculates the difference in hours between two dates.
 * @param    {Date} date The other date
 * @return    {Number} Difference
 */
Date.prototype.differenceInHours = function(date) {
  var
  diff = (this.getTime() - date.getTime()) / 3600000;
  return parseInt(diff < 0 ? 0 : diff, 10).toString(10);
};
/**
 * @function Removes time component from a date.
 * @return   {Date} New date
 */
Date.prototype.removeTime = function() {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};
/**
 * @function Tries to get locale date string for a particular locale.
 * @param    {Date} locale The locale
 * @return   {String} Representation of date
 */
Date.prototype.tryToLocaleDateString = function(locale) {
  try {
    return this.toLocaleDateString(locale);
  }
  catch(err) {
    return this.toLocaleString();
  }
};
/**
 * @function Gets standard date format used in the application.
 * @return   {String} Representation of date
 */
Date.prototype.toStandardDate = function() {
  return [this.getFullYear(), this.getMonth() + 1, this.getDate()].join("-");
};
/**
 * @function Parses standard representation to date.
 * @param    {String} input The input string
 * @return   {Date} Date
 */
Date.parseStandard = function(input) {
  try{
    var steps = input.split("-");
    return new Date(parseInt(steps[0], 10), parseInt(steps[1], 10) - 1, parseInt(steps[2], 10));
  }
  catch (e) {
    return new Date(-1);
  }
};
/**
 * @function Get time of milliseconds from enum
 * @param    {String} val Value containing value and quantity
 * @returns  {Number} The number of milliseconds.
 */
Date.getTimeFromEnum = function(val) {
  return parseInt(val, 10) * UnitMult[val.replace(/[0-9]/g, "")];
}
