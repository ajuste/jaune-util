var equal, executeNode, ref, throws;

executeNode = require('../../').Reflection.executeNode;

ref = require('assert'), equal = ref.equal, throws = ref.throws;

describe('executeNode', function() {
  describe('invalid node', function() {
    return it('throws an invalid node exception', function() {
      return throws((function() {
        return executeNode({}, {
          operation: '?'
        });
      }));
    });
  });
  describe('namespace node', function() {
    return it('returns member by name', function() {
      return equal('bar', executeNode({
        foo: 'bar'
      }, {
        operation: 'n',
        params: 'foo'
      }));
    });
  });
  describe('module node', function() {
    return it('returns member by require', function() {
      return equal('function', typeof executeNode(null, {
        operation: 'm',
        params: 'assert'
      }));
    });
  });
  describe('require node', function() {
    describe('require without slash', function() {
      return it('returns member by require', function() {
        return equal('function', typeof executeNode(null, {
          operation: 'r',
          params: 'assert'
        }));
      });
    });
    return describe('require with slash', function() {
      return it('returns member by require', function() {
        return equal('function', typeof executeNode(null, {
          operation: 'r',
          params: './node_modules/assert'
        }));
      });
    });
  });
  describe('module node', function() {
    return it('returns member by require', function() {
      return equal('function', typeof executeNode(null, {
        operation: 'm',
        params: 'assert'
      }));
    });
  });
  describe('call node', function() {
    describe('with function', function() {
      return it('returns called member', function() {
        return equal('foobar', executeNode((function(p) {
          return p + "bar";
        }), {
          operation: 'c',
          params: ['foo']
        }));
      });
    });
    return describe('with no function', function() {
      return it('throws an error', function() {
        return throws((function() {
          return executeNode({}, {
            operation: 'c',
            params: ['foo']
          });
        }));
      });
    });
  });
  return describe('instance node', function() {
    describe('with function', function() {
      return it('returns called member', function() {
        var ctr;
        ctr = function(p) {
          return this.p = p;
        };
        return equal('foo', executeNode(ctr, {
          operation: 'i',
          params: ['foo']
        }).p);
      });
    });
    return describe('with no function', function() {
      return it('throws an error', function() {
        return throws((function() {
          return executeNode({}, {
            operation: 'i',
            params: ['foo']
          });
        }));
      });
    });
  });
});
