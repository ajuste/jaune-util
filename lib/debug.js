/**
 * @file   Source code for Debug Util.
 * @author Alvaro Juste
 */

"use strict";

var Util = require("util");

/**
 * @constructor Constructs an instance of the class.
 * @name {jaune.common.Debug}
 */
var Debug = function() {}

Debug.prototype = {
  /**
   * @function Writes object into debug.
   * @param {Object} obj Object to be written.
   * @returns
   */
  writeObject : function(obj) {
    return Util.inspect(obj, {
      showHidden: true,
      colors: true
    });
  },
  /**
  * @function Prints an object into log.
  * @param {Object} obj The object.
  * @param {String} module Name of mofule printing.
  */
  printObject : function(obj, module) {
    Util.log("[DEBUG" + (module ? "/" + module : "OBJ") + "] " + this.writeObject(obj));
  },
  /**
  * @function Prints text into log.
  * @param {String} text Text to be printed.
  * @param {String} module Name of mofule printing.
  */
  printText : function(text, module) {
    Util.log("[DEBUG" + (module ? "/" + module : "") + "] " + text);
  }
};
module.exports = {
  Debug : new Debug()
};
