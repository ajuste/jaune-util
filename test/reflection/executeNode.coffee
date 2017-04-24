{executeNode} = require('../../').Reflection
{equal, throws} = require 'assert'

describe 'executeNode', ->

  describe 'invalid node', ->

    it 'throws an invalid node exception', ->
      throws (-> executeNode {}, operation: '?')

  describe 'namespace node', ->

    it 'returns member by name', ->
      equal 'bar', executeNode {foo: 'bar'}, {operation: 'n', params: 'foo'}

  describe 'module node', ->

    it 'returns member by require', ->
      equal 'function',
        typeof executeNode null, {operation: 'm', params: 'assert'}

  describe 'require node', ->

    describe 'require without slash', ->

      it 'returns member by require', ->
        equal 'function',
          typeof executeNode null, {operation: 'r', params: 'assert'}

    describe 'require with slash', ->

      it 'returns member by require', ->
        equal 'function', typeof executeNode null, {
          operation: 'r',
          params: './node_modules/assert'
        }

  describe 'module node', ->

    it 'returns member by require', ->
      equal 'function', typeof executeNode null, {
        operation: 'm',
        params: 'assert'
      }

  describe 'call node', ->

    describe 'with function', ->

      it 'returns called member', ->
        equal 'foobar', executeNode ((p) -> "#{p}bar"), {
          operation: 'c',
          params: ['foo']
        }

    describe 'with no function', ->

      it 'throws an error', ->
        throws (-> executeNode {}, {operation: 'c', params: ['foo']})

  describe 'instance node', ->

    describe 'with function', ->

      it 'returns called member', ->
        ctr = (p) -> @p = p
        equal 'foo', executeNode(ctr, {operation: 'i', params: ['foo']}).p

    describe 'with no function', ->

      it 'throws an error', ->
        throws (-> executeNode {}, {operation: 'i', params: ['foo']})
