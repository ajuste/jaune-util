"use strict";

var Util   = require("util");
var Stream = require("stream");
/**
 * @class Write read stream.
 */
function WriteReadStream() {

  Stream.call(this);
  this.readable = true;
  this.writable = true;
  /**
   * @function Write into stream
   */
  this.write = function () {
    this.emit.apply(this, ["data"].concat(Array.prototype.slice.call(arguments, 0)));
  };
  /**
   * @function Mark as end.
   */
  this.end = function () {
    this.emit.apply(this, ["end"].concat(Array.prototype.slice.call(arguments, 0)));
  };
}

Util.inherits(WriteReadStream, Stream);

module.exports = {
  WriteReadStream : WriteReadStream
};
