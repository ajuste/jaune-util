var equal, evaluateName, evaluateNameAndArgs, ref, ref1, throws;

ref = require('../../').Reflection, evaluateNameAndArgs = ref.evaluateNameAndArgs, evaluateName = ref.evaluateName;

ref1 = require('assert'), equal = ref1.equal, throws = ref1.throws;

describe('evaluateNameAndArgs', function() {
  describe('pointing to invalid reference', function() {
    return it('throws an exception on invalid ref', function() {
      return throws((function() {
        return evaluateNameAndArgs('[r(assert)].whatever');
      }));
    });
  });
  return describe('pointing to valid reference', function() {
    return it('returns correct value of chain', function() {
      return equal('11', evaluateName('[r(/test/reflection/dummyObj)].fn.[c(p1, p1)]', {
        p1: 1
      }));
    });
  });
});
