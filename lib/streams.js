"use strict";
var Stream, WriteReadStream, inherits;

inherits = require('util').inherits;

Stream = require('stream');


/**
* @class Write read stream.
 */

WriteReadStream = (function() {
  function WriteReadStream() {
    Stream.call(this);
    this.readable = true;
    this.writable = true;
  }


  /**
  * @function Write into stream
   */

  WriteReadStream.prototype.write = function() {
    return this.emit.apply(this, ["data"].concat(Array.prototype.slice.call(arguments, 0)));
  };


  /**
  * @function Mark as end.
   */

  WriteReadStream.prototype.end = function() {
    return this.emit.apply(this, ["end"].concat(Array.prototype.slice.call(arguments, 0)));
  };

  return WriteReadStream;

})();

inherits(WriteReadStream, Stream);

module.exports = {
  WriteReadStream: WriteReadStream
};
