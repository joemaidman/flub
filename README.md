# Bedrock [![Build Status](https://travis-ci.org/joemaidman/bedrock.svg?branch=master)](https://travis-ci.org/joemaidman/bedrock)

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

'bed-rock' is available as an npm package

    $ npm install bed-rock --save-dev

Add the following to scripts in package.json (with optional configuration flags)

    'test' : 'bed-rock'

Run tests

    npm test

Bedrock will automatically load any files that match '*.spec.js'. This can be changed by passing a custom pattern (see [configuration](#Spies-&-stubs))

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

```context(description: string, tests: function)```

A container for one or more tests (can be nested with other contexts)

```test(description: string, assertions: function)```

A container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be passing and a spec with any failures will fail

```expect(subject: any)```

Creates an assertion for a test

```expect(subject: any).not```

Creates an assertion for a test and reversed the evaluation logic

```xcontext(description: string, tests: function)```

A container for one or more tests (can be nested with other contexts) which will be ignored

```xtest(description: string, assertions: function)```

A container for a single test which will be ignored

```spy(target: any, functionName: string)```

A wrapper to spy on or stub an existing function or property of an object. See [Spies & Stubs](#Spies-&-stubs) Spies section for more details


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

```setup(function)```

Runs once before all tests in a context

```setupEach(function)```


Runs before each test in a context

```teardown(function)```

Runs once after all tests in a context

```tearDownEach(function)```

Runs after each test in a context

## Matchers

```toBe(value: any)```</br>
subject and value are equal using '==='

```toEqual(value: any)```</br>
subject and value are deeply equal

```toBeDefined()```</br>
subject is defined

```toBeUndefined()```</br>
subject is undefined

```toBeNull()```</br>
subject is  null

```toBeNotNull()```</br>
subject is not null

```toBeGreaterThan(target: number)```</br>
subject is greater than a target

```toBeLessThan(target: number)```</br>
subject is less than a target

```toBeGreaterThanOrEqualTo(target: number)```</br>
subject is greater than or equal to a target

```toBeLessThanOrEqualTo(target: number)```</br>
subject is less than or equal to a target

```toBeBetweenInclusive(minimumThreshold: number, maximumThreshold: number)```</br>
subject is between the minimumThreshold and maximumThreshold including these boundaries

```toBeBetweenExclusive(minimumThreshold: number, maximumThreshold: number)```</br>
subject is between the minimumThreshold and maximumThreshold excluding these boundaries

```toBeCloseToInclusive(target: number, delta: number)```</br>
subject is within the delta of the target, including boundaries

```toBeCloseToExclusive(target: number, delta: number)```</br>
subject is within the delta of the target, excluding boundaries

```toBeTypeOf(name: string)```</br>
subject is of type name

```toRespondTo(name: string)```</br>
subject has property or function of name

```toHaveLength(length: number)```</br>
subject (Array, Map, Set or String) has length

```toHaveKey(key: any)```</br>
subject (Map or Object) contains key

```toContain(item: any)```</br>
subject (Array, Set, Map, String) contains the item

```toBeFalsey()```</br>
subject evaluates to false in a boolean context

```toBeTruthy()```</br>
subject evaluates to true in a boolean context

```toBeStringContaining(text: string, caseSensitive: boolean)```</br>
subject (string) contains text with optional case sensitivity (default false)

```toBeStringMatching(regexPattern: RegEx)```</br>
subject (string) matches the regexPatern

```toThrow(message: string)```</br>
subject throws message. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message'); 

```toThrowError(errorType: any, errorMessage: string)```</br>
subject throws an error of errorType with errorMessage. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message');

```toHaveBeenCalled(callCount: Number)```</br>
subject (Spy) was called callCount times

```toHaveBeenCalledWith(...args: [])```</br>
subject's (Spy) call history contains at least one call with specified args

## Spies & Stubs
Bedrock combines the notion of spies and stubs:

```spy(target: any, functionName: string)```

A wrapper to spy on or stub an existing function or property of an object

```andReturn(value: any)```

stubs the spy target's attribute to return the value

```andFake(function: Function)```

stubs the spy target's attribute to call the function

```reset()```

resets a spy, cleaing the call cound and call history

```restore()```

restores the spy target's original function call or value

```getCallCount()```

returns the spy's call count. Prefer toHaveBeenCalled() matcher

```getCallHistory```

returns an array of the spy's call history. Prefer toHaveBeenCalledWith() matcher

 ## Future development
 - Focus tests
 - Async matchers (promise resolution)
 - Time manipulation




