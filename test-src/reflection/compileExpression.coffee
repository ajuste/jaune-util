{compileExpression} = require('../../').Reflection
{equal} = require 'assert'

describe 'compileExpression', ->

  describe 'without tokens', ->

    describe 'with 1 step', ->

      before -> @node = compileExpression 'foo'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 1', -> equal 1, @node.length

      it 'has correct type', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'foo', @node[0].params

    describe 'with 2 steps', ->

      before -> @node = compileExpression 'foo.bar'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type on nodes', ->
        equal 'n', @node[0].operation
        equal 'n', @node[1].operation

      it 'has correct params', ->
        equal 'foo', @node[0].params
        equal 'bar', @node[1].params

  describe 'require token', ->

    describe 'basic use', ->

      before -> @node = compileExpression '[r(assert)]'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 1', -> equal 1, @node.length

      it 'has correct type', -> equal 'r', @node[0].operation

      it 'has correct params', -> equal 'assert', @node[0].params

    describe 'with slash', ->

      before -> @node = compileExpression '[r(/node_modules/assert)]'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 1', -> equal 1, @node.length

      it 'has correct type', -> equal 'r', @node[0].operation

      it 'has correct params', -> equal '/node_modules/assert', @node[0].params

  describe 'module token', ->

    before -> @node = compileExpression '[m(assert)]'

    after -> @node = null

    it 'returns an array of nodes', -> equal 'object', typeof @node

    it 'has length of 1', -> equal 1, @node.length

    it 'has correct type', -> equal 'm', @node[0].operation

    it 'has correct params', -> equal 'assert', @node[0].params

  describe 'call token', ->

    describe 'no params', ->

      before -> @node = compileExpression 'func.[c()]'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'c', @node[1].operation

      it 'has no params', -> equal 0, @node[1].params.length

    describe 'with 1 param non-global', ->

      before -> @node = compileExpression 'func.[c(p1)]', p1: 'param 1'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'c', @node[1].operation

      it 'has 1 param', -> equal 1, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

    describe 'with 3 params non-global', ->

      before -> @node = compileExpression 'func.[c(p1,p2,p1)]', p1: 'param 1', p2: 'param 2'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'c', @node[1].operation

      it 'has 3 params', -> equal 3, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

      it 'second parameter value is "param 2"', -> equal 'param 2', @node[1].params[1]

      it 'third parameter value is "param 1"', -> equal 'param 1', @node[1].params[2]

    describe 'with 4: 3 params non-global and 1 global', ->

      before -> @node = compileExpression 'func.[c(p1,p2,p1,p3)]', {p1: 'param 1', p2: 'param 2', p3: '[g(pg)]'}, {pg: 'param g'}

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'c', @node[1].operation

      it 'has 4 params', -> equal 4, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

      it 'second parameter value is "param 2"', -> equal 'param 2', @node[1].params[1]

      it 'third parameter value is "param 1"', -> equal 'param 1', @node[1].params[2]

      it 'fourth parameter value is "param g"', -> equal 'param g', @node[1].params[3]

  describe 'instance token', ->

    describe 'no params', ->

      before -> @node = compileExpression 'func.[i()]'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'i', @node[1].operation

      it 'has no params', -> equal 0, @node[1].params.length

    describe 'with 1 param non-global', ->

      before -> @node = compileExpression 'func.[i(p1)]', p1: 'param 1'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'i', @node[1].operation

      it 'has 1 param', -> equal 1, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

    describe 'with 3 params non-global', ->

      before -> @node = compileExpression 'func.[i(p1,p2,p1)]', p1: 'param 1', p2: 'param 2'

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'i', @node[1].operation

      it 'has 3 params', -> equal 3, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

      it 'second parameter value is "param 2"', -> equal 'param 2', @node[1].params[1]

      it 'third parameter value is "param 1"', -> equal 'param 1', @node[1].params[2]

    describe 'with 4: 3 params non-global and 1 global', ->

      before -> @node = compileExpression 'func.[i(p1,p2,p1,p3)]', {p1: 'param 1', p2: 'param 2', p3: '[g(pg)]'}, {pg: 'param g'}

      after -> @node = null

      it 'returns an array of nodes', -> equal 'object', typeof @node

      it 'has length of 2', -> equal 2, @node.length

      it 'has correct type for first node', -> equal 'n', @node[0].operation

      it 'has correct params', -> equal 'func', @node[0].params

      it 'has correct type for second node', -> equal 'i', @node[1].operation

      it 'has 4 params', -> equal 4, @node[1].params.length

      it 'first parameter value is "param 1"', -> equal 'param 1', @node[1].params[0]

      it 'second parameter value is "param 2"', -> equal 'param 2', @node[1].params[1]

      it 'third parameter value is "param 1"', -> equal 'param 1', @node[1].params[2]

      it 'fourth parameter value is "param g"', -> equal 'param g', @node[1].params[3]
