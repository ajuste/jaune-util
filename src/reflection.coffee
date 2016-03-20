###*
* @file   Source code for Reflection utility.
* @author Alvaro Juste
###
"use strict";

{isFunction, isObject, isString, chain, reduce} = require 'lodash'
{join} = require 'path'

INST_REGEX      = /^\[(\w{1})\((.*)\)\]$/;
GLOBAL_REGEX    = /^\[g\((.*)\)\]$/;
TOKEN_REQUIRE   = "r";
TOKEN_MODULE    = "m";
TOKEN_NAMESPACE = "n";
TOKEN_CALL      = "c";
TOKEN_INSTANCE  = "i";

###*
*  Create an instance of the given constructor with the given arguments.
*
* @param   {Function} constructor The constructing function.
* @param   {Array} args Arguments for the constructor
* @returns The instance.
###
applyNew = (constructor, args) ->
  inst = Object.create constructor.prototype
  constructor.apply inst, args
  inst

###*
* @function Creates an instance of the given name
* @param    {String} fullName The name of the reference to be looked up
* @param    {Object} [args] Arguments for the function
* @param    {Object} [context] Initial search point for look up
* @param    {Object} [globals] References that might be required in look up
* @returns  {Object} Instantiated object
###
createInstance = (fullName, args, context, globals) ->
  {fn, args}  = evaluateNameAndArgs fullName, args, context, globals
  applyNew fn, args

###*
* @function Evaluates a function and its arguments
* @param    {String} fullName The name of the reference to be looked up
* @param    {Object} [args] Arguments for the function
* @param    {Object} [context] Initial search point for look up
* @param    {Object} [globals] References that might be required in look up
* @returns  {Object} Object with function and arguments
###
evaluateNameAndArgs = (fullName, args, context, globals) ->

  fn                = evaluateName fullName, context, args, globals
  resolvedArguments = args;

  throw new Error "Full name points to invalid function #{fullName}" unless isFunction fn

  if isObject globals
    resolvedArguments = chain (args)
                        .map  (e -> if isString(e) and e.indexOf('_') is 0 then globals[e.substring(1)] else e)
                        .value()

  {fn, args : resolvedArguments}

###*
* @function Returns a compiled expression
* @param    {String} expr The name of the reference to be compiled
* @param    {Object} [args] Arguments for the function
* @param    {Object} [globals] References that might be required in look up
* @returns  {Array}  Compiled nodes
###
compileExpression = (expr, args = {}, globals = {}) ->

  chain expr.split(".")
  .map ((e) ->

    isOperation = INST_REGEX.test e
    operation = if isOperation then e.replace INST_REGEX, '$1' else TOKEN_NAMESPACE
    params = if isOperation then e.replace INST_REGEX, '$2' else e;

    switch operation

      when TOKEN_CALL, TOKEN_INSTANCE

        params =
          chain  params.split(",")
          .map   ((e) -> e.trim())
          .filter((e) -> !!e)
          .map   ((e) ->

            value = args[e];
            isGlobal = GLOBAL_REGEX.test value

            return globals[value.replace GLOBAL_REGEX, '$1'] if isGlobal
            value
          )
          .value()

    {params, operation})
    .value()

executeNode = (current, node) ->

  {operation, params} = node

  switch operation

    when TOKEN_REQUIRE
       node = require if params.indexOf('/') isnt -1 then join(process.cwd(), params) else params

    when TOKEN_MODULE
       node = require params

    when TOKEN_NAMESPACE
       node = current[params];

    when TOKEN_CALL
      unless isFunction current
        throw new Error 'Call instruction can only be perfomed on functions'
      node = current.apply undefined, params

    when TOKEN_INSTANCE
      unless isFunction current
        throw new Error 'New instruction can only be perfomed on functions'
      node = applyNew current, node.params

    else
      throw new Error "Unsupported node type: #{operation}"

  throw new Error 'Full name points to invalid reference' unless node
  node

evaluateName = (exprs, args, context, globals) ->

  throw new Error 'Expression should be a string' unless typeof exprs is 'string'

  nodes = compileExpression exprs, args, globals
  reduce nodes, this.executeNode, context ? global, this

module.exports =
  Reflection : {createInstance, evaluateNameAndArgs, compileExpression,
    evaluateName, executeNode}
