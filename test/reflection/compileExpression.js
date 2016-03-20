var compileExpression, equal;

compileExpression = require('../../').Reflection.compileExpression;

equal = require('assert').equal;

describe('compileExpression', function() {
  describe('without tokens', function() {
    describe('with 1 step', function() {
      before(function() {
        return this.node = compileExpression('foo');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 1', function() {
        return equal(1, this.node.length);
      });
      it('has correct type', function() {
        return equal('n', this.node[0].operation);
      });
      return it('has correct params', function() {
        return equal('foo', this.node[0].params);
      });
    });
    return describe('with 2 steps', function() {
      before(function() {
        return this.node = compileExpression('foo.bar');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type on nodes', function() {
        equal('n', this.node[0].operation);
        return equal('n', this.node[1].operation);
      });
      return it('has correct params', function() {
        equal('foo', this.node[0].params);
        return equal('bar', this.node[1].params);
      });
    });
  });
  describe('require token', function() {
    describe('basic use', function() {
      before(function() {
        return this.node = compileExpression('[r(assert)]');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 1', function() {
        return equal(1, this.node.length);
      });
      it('has correct type', function() {
        return equal('r', this.node[0].operation);
      });
      return it('has correct params', function() {
        return equal('assert', this.node[0].params);
      });
    });
    return describe('with slash', function() {
      before(function() {
        return this.node = compileExpression('[r(/node_modules/assert)]');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 1', function() {
        return equal(1, this.node.length);
      });
      it('has correct type', function() {
        return equal('r', this.node[0].operation);
      });
      return it('has correct params', function() {
        return equal('/node_modules/assert', this.node[0].params);
      });
    });
  });
  describe('module token', function() {
    before(function() {
      return this.node = compileExpression('[m(assert)]');
    });
    after(function() {
      return this.node = null;
    });
    it('returns an array of nodes', function() {
      return equal('object', typeof this.node);
    });
    it('has length of 1', function() {
      return equal(1, this.node.length);
    });
    it('has correct type', function() {
      return equal('m', this.node[0].operation);
    });
    return it('has correct params', function() {
      return equal('assert', this.node[0].params);
    });
  });
  describe('call token', function() {
    describe('no params', function() {
      before(function() {
        return this.node = compileExpression('func.[c()]');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('c', this.node[1].operation);
      });
      return it('has no params', function() {
        return equal(0, this.node[1].params.length);
      });
    });
    describe('with 1 param non-global', function() {
      before(function() {
        return this.node = compileExpression('func.[c(p1)]', {
          p1: 'param 1'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('c', this.node[1].operation);
      });
      it('has 1 param', function() {
        return equal(1, this.node[1].params.length);
      });
      return it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
    });
    describe('with 3 params non-global', function() {
      before(function() {
        return this.node = compileExpression('func.[c(p1,p2,p1)]', {
          p1: 'param 1',
          p2: 'param 2'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('c', this.node[1].operation);
      });
      it('has 3 params', function() {
        return equal(3, this.node[1].params.length);
      });
      it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
      it('second parameter value is "param 2"', function() {
        return equal('param 2', this.node[1].params[1]);
      });
      return it('third parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[2]);
      });
    });
    return describe('with 4: 3 params non-global and 1 global', function() {
      before(function() {
        return this.node = compileExpression('func.[c(p1,p2,p1,p3)]', {
          p1: 'param 1',
          p2: 'param 2',
          p3: '[g(pg)]'
        }, {
          pg: 'param g'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('c', this.node[1].operation);
      });
      it('has 4 params', function() {
        return equal(4, this.node[1].params.length);
      });
      it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
      it('second parameter value is "param 2"', function() {
        return equal('param 2', this.node[1].params[1]);
      });
      it('third parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[2]);
      });
      return it('fourth parameter value is "param g"', function() {
        return equal('param g', this.node[1].params[3]);
      });
    });
  });
  return describe('instance token', function() {
    describe('no params', function() {
      before(function() {
        return this.node = compileExpression('func.[i()]');
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('i', this.node[1].operation);
      });
      return it('has no params', function() {
        return equal(0, this.node[1].params.length);
      });
    });
    describe('with 1 param non-global', function() {
      before(function() {
        return this.node = compileExpression('func.[i(p1)]', {
          p1: 'param 1'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('i', this.node[1].operation);
      });
      it('has 1 param', function() {
        return equal(1, this.node[1].params.length);
      });
      return it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
    });
    describe('with 3 params non-global', function() {
      before(function() {
        return this.node = compileExpression('func.[i(p1,p2,p1)]', {
          p1: 'param 1',
          p2: 'param 2'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('i', this.node[1].operation);
      });
      it('has 3 params', function() {
        return equal(3, this.node[1].params.length);
      });
      it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
      it('second parameter value is "param 2"', function() {
        return equal('param 2', this.node[1].params[1]);
      });
      return it('third parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[2]);
      });
    });
    return describe('with 4: 3 params non-global and 1 global', function() {
      before(function() {
        return this.node = compileExpression('func.[i(p1,p2,p1,p3)]', {
          p1: 'param 1',
          p2: 'param 2',
          p3: '[g(pg)]'
        }, {
          pg: 'param g'
        });
      });
      after(function() {
        return this.node = null;
      });
      it('returns an array of nodes', function() {
        return equal('object', typeof this.node);
      });
      it('has length of 2', function() {
        return equal(2, this.node.length);
      });
      it('has correct type for first node', function() {
        return equal('n', this.node[0].operation);
      });
      it('has correct params', function() {
        return equal('func', this.node[0].params);
      });
      it('has correct type for second node', function() {
        return equal('i', this.node[1].operation);
      });
      it('has 4 params', function() {
        return equal(4, this.node[1].params.length);
      });
      it('first parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[0]);
      });
      it('second parameter value is "param 2"', function() {
        return equal('param 2', this.node[1].params[1]);
      });
      it('third parameter value is "param 1"', function() {
        return equal('param 1', this.node[1].params[2]);
      });
      return it('fourth parameter value is "param g"', function() {
        return equal('param g', this.node[1].params[3]);
      });
    });
  });
});
