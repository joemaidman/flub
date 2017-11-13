# Bedrock [![Build Status](https://travis-ci.org/joemaidman/bedrock.svg?branch=master)](https://travis-ci.org/joemaidman/bedrock)

[![NPM](https://nodei.co/npm/bed-rock.png?compact=true)](https://npmjs.org/package/bed-rock)

```
           ,                  /\.__      _.-\
          /~\,      __       /~    \   ./    \
        ,/  /_\   _/  \    ,/~,_.~'"\ /_\_  /'\
       / \ /## \ / V#\/\  /~8#  # ## V8  #\/8 8\
     /~#'#"#""##V&#&# ##\/88#"#8# #" #\#&"##" ##\
    j# ##### #"#\&&"####/###&  #"#&## #&" #"#&#"#'\
   /#"#"#####"###'\&##"/&#"####"### # #&#&##"#"### \
  J#"###"#"#"#"####'\# #"##"#"##"#"#####&"## "#"&"##|\ 
  ```

Bedrock is a javascript BDD / TDD unit testing framework for Node.js. 

It comprises a CLI test runner/reporter, assertion library and utilities including stubs and spies.

## Installation

'bed-rock' is available as an [npm package](https://www.npmjs.com/package/bed-rock):

    $ npm install bed-rock --save-dev

Add the following to scripts in package.json (with optional configuration flags):

    'test' : 'bed-rock'

Run tests:

    npm test

Bedrock will automatically load any files that match '*.spec.js'. This can be changed by passing a custom pattern (see [configuration](#configuration))

## Configuration
Bedrock accepts several flags on startup:

Set your test file extention (default spec)

    --ext='my-test-ext'

Enable watch mode; Bedrock will automatically reload on file changes

    --watch

Disable create of global window and document (DOM) objects

    --nodom

Disable printing of the failure summary details

    --nosumm

## Usage
Bedrock exposes several core functions for composing tests:

<b>```context(description: string, tests: function)```</b>

A container for one or more tests (can be nested with other contexts)

<b>```test(description: string, assertions: function)```</b>

A container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be passing and a spec with any failures will fail

<b>```expect(subject: any)```</b>

Creates an assertion for a test

<b>```expect(subject: any).not```</b>

Creates an assertion for a test and reversed the evaluation logic

<b>```xcontext(description: string, tests: function)```</b>

A container for one or more tests (can be nested with other contexts) which will be ignored

<b>```xtest(description: string, assertions: function)```</b>

A container for a single test which will be ignored

<b>```spy(target: any, functionName: string)```</b>

A wrapper to spy on or stub an existing function or property of an object. See [Spies & Stubs](#spies-and-stubs) for more details


## Basic example test file

```js
var context = require('bed-rock').context;  
var test = require('bed-rock').test;  
var expect = require('bed-rock').expect;  

context("GIVEN the state of the world", () => {
    let myTestSubject = 1;

    context("WHEN some action(s) have been performed")

    test('THEN I expect this outcome',() =>{
        expect(myTestSubject).toEqual(1);
    });

});
```

Comprehensive example usage of all matchers can be found in 'example-matchers.js' in the root directory.

## Hooks

These must be declared before any tests in a context.

<b>```setup(function)```</b>

Runs once before all tests in a context

<b>```setupEach(function)```</b>


Runs before each test in a context

<b>```teardown(function)```</b>

Runs once after all tests in a context

<b>```tearDownEach(function)```</b>

Runs after each test in a context

## Matchers

<b>```toBe(value: any)```</br></b>
subject and value are equal using '==='

<b>```toEqual(value: any)```</br></b>
subject and value are deeply equal

<b>```toBeDefined()```</br></b>
subject is defined

<b>```toBeUndefined()```</br></b>
subject is undefined

<b>```toBeNull()```</br></b>
subject is  null

<b>```toBeNotNull()```</br></b>
subject is not null

<b>```toBeGreaterThan(target: number)```</br></b>
subject is greater than a target

<b>```toBeLessThan(target: number)```</br></b>
subject is less than a target

<b>```toBeGreaterThanOrEqualTo(target: number)```</br></b>
subject is greater than or equal to a target

<b>```toBeLessThanOrEqualTo(target: number)```</br></b>
subject is less than or equal to a target

<b>```toBeBetweenInclusive(minimumThreshold: number, maximumThreshold: number)```</br></b>
subject is between the minimumThreshold and maximumThreshold including these boundaries

<b>```toBeBetweenExclusive(minimumThreshold: number, maximumThreshold: number)```</br></b>
subject is between the minimumThreshold and maximumThreshold excluding these boundaries

<b>```toBeCloseToInclusive(target: number, delta: number)```</br></b>
subject is within the delta of the target, including boundaries

<b>```toBeCloseToExclusive(target: number, delta: number)```</br></b>
subject is within the delta of the target, excluding boundaries

<b>```toBeTypeOf(name: string)```</br></b>
subject is of type name

<b>```toRespondTo(name: string)```</br></b>
subject has property or function of name

<b>```toHaveLength(length: number)```</br></b>
subject (Array, Map, Set or String) has length

<b>```toHaveKey(key: any)```</br></b>
subject (Map or Object) contains key

<b>```toContain(item: any)```</br></b>
subject (Array, Set, Map, String) contains the item

<b>```toBeFalsey()```</br></b>
subject evaluates to false in a boolean context

<b>```toBeTruthy()```</br></b>
subject evaluates to true in a boolean context

<b>```toBeStringContaining(text: string, caseSensitive: boolean)```</br></b>
subject (string) contains text with optional case sensitivity (default false)

<b>```toBeStringMatching(regexPattern: RegEx)```</br></b>
subject (string) matches the regexPatern

<b>```toThrow(message: string)```</br></b>
subject throws message. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message'); 

<b>```toThrowError(errorType: any, errorMessage: string)```</br></b>
subject throws an error of errorType with errorMessage. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message');

<b>```toHaveBeenCalled(callCount: Number)```</br></b>
subject (Spy) was called callCount times

<b>```toHaveBeenCalledWith(...args: [])```</br></b>
subject's (Spy) call history contains at least one call with specified args

<b>```toHaveBeenCalledWithFirst(...args: [])```</br></b>
subject's (Spy) first call arguments equal specified args

<b>```toHaveBeenCalledWithLast(...args: [])```</br></b>
subject's (Spy) last call arguments equal specified args

## Spies and Stubs
Bedrock combines the notion of spies and stubs:

<b>```spy(target: any, functionName: string)```</b>

A wrapper to spy on or stub an existing function or property of an object

<b>```andReturn(value: any)```</b>

stubs the spy target's attribute to return the value

<b>```andFake(function: Function)```</b>

stubs the spy target's attribute to call the function

<b>```reset()```</b>

resets a spy, cleaing the call cound and call history

<b>```restore()```</b>

restores the spy target's original function call or value

<b>```getCallCount()```</b>

returns the spy's call count. Prefer toHaveBeenCalled() matcher

<b>```getCallHistory```</b>

returns an array of the spy's call history. Prefer toHaveBeenCalledWith() matcher

 ## Future development
 - Focus tests
 - Async matchers (promise resolution)
 - Time manipulation




