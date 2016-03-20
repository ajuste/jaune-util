{evaluateNameAndArgs, evaluateName} = require('../../').Reflection
{equal, throws} = require 'assert'

describe 'evaluateNameAndArgs', ->

  describe 'pointing to invalid reference', ->

    it 'throws an exception on invalid ref', ->
      throws (-> evaluateNameAndArgs '[r(assert)].whatever')

  describe 'pointing to valid reference', ->

    it 'returns correct value of chain', ->
      equal '11', evaluateName '[r(/test/reflection/dummyObj)].fn.[c(p1, p1)]', {p1: 1}
