<p align="center">
  <img src="./assets/flub.png" height="80" alt="Flub Logo" />
</p>

# Flub [![Build Status](https://travis-ci.org/joemaidman/flub.svg?branch=master)](https://travis-ci.org/joemaidman/flub)

[![NPM](https://nodei.co/npm/flub.png?compact=true)](https://npmjs.org/package/flub)

Flub is a javascript BDD / TDD unit testing framework for Node.js.

It comprises a CLI test runner/reporter, assertion library and utilities including stubs and spies.

## Installation

'flub' is available as an [npm package](https://www.npmjs.com/package/flub):

    $ npm install flub --save-dev

Add the following to scripts in package.json (with optional configuration flags):

    'test' : 'flub'

Run tests:

    npm test

Flub will automatically load any files that match '\*.spec.js'. This can be changed by passing a custom pattern ([see configuration](#configuration))

## Configuration

Flub accepts several flags on startup. Note that flub will need to be restarted if running in watch mode, if any of these flags are changed.

Set your test file extention (default spec)

    --ext='my-test-ext'

Enable watch mode; Flub will automatically reload on file changes

    --watch

Disable creation of global window and document (DOM) objects

    --nodom

Disable printing of the failure summary details

    --nosumm

## Usage

Flub exposes several core functions for composing tests:

<b>`context(description: string, tests: function)`</b>

a container for one or more tests (can be nested with other contexts)

<b>`test(description: string, assertions: function)`</b>

a container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be green/passing and a spec with any failed expectations will be red/failing

<b>`expect(subject: any)`</b>

creates an assertion for a test

<b>`expect(subject: any).not`</b>

creates an assertion for a test and reversed the evaluation logic

<b>`xcontext(description: string, tests: function)`</b>

a container for one or more tests (can be nested with other contexts) which will be ignored. NOTE: this overrides any nested focused tests (ftest) defined inside the context

<b>`xtest(description: string, assertions: function)`</b>

a container for a single test which will be ignored

<b>`ftest(description: string, assertions: function)`</b>

a container for a single test which will be focused. The presence of a single focused tests will cause any unfocused tests to be ignored.

<b>`spy(target: any, functionOrPropertyName: string)`</b>

a wrapper to spy on or stub an existing function or property of an object. See [Spies & Stubs](#spies-and-stubs) for more details

## Basic example test file

```js
var context = require('flub').context;
var test = require('flub').test;
var expect = require('flub').expect;

/* es6 import
import { context, test, expect } from 'flub;
*/

context('GIVEN the state of the world', () => {
    let myTestSubject = 1;

    context('WHEN some action(s) have been performed');

    test('THEN I expect this outcome', () => {
        expect(myTestSubject).toEqual(1);
    });
});
```

Comprehensive example usage of all matchers can be found in 'example-matchers.js' in the root directory. Note that exactly half of these example tests fail; this is deliberate and designed to show how each matcher can be set-up to both pass and fail.

## Hooks

These <b>must be declared before any tests in a context</b>. Prefer variable declaration/assignment and function calls within these hooks.

<b>`setup(function)`</b>

runs once before all tests in a context

<b>`setupEach(function)`</b>

runs before each test in a context

<b>`teardown(function)`</b>

runs once after all tests in a context

<b>`teardownEach(function)`</b>

runs after each test in a context

## Matchers

<b>`toBe(value: any)`</br></b>
subject and value are equal using '==='. Use for comparing values

<b>`toEqual(value: any)`</br></b>
subject and value are deeply equal. Use for comparing objects

<b>`toBeDefined()`</br></b>
subject is defined

<b>`toBeUndefined()`</br></b>
subject is undefined

<b>`toBeNull()`</br></b>
subject is null

<b>`toBeNotNull()`</br></b>
subject is not null

<b>`toBeGreaterThan(target: number)`</br></b>
subject is greater than a target

<b>`toBeLessThan(target: number)`</br></b>
subject is less than a target

<b>`toBeGreaterThanOrEqualTo(target: number)`</br></b>
subject is greater than or equal to a target

<b>`toBeLessThanOrEqualTo(target: number)`</br></b>
subject is less than or equal to a target

<b>`toBeBetweenInclusive(minimumThreshold: number, maximumThreshold: number)`</br></b>
subject is between the minimumThreshold and maximumThreshold including these boundaries

<b>`toBeBetweenExclusive(minimumThreshold: number, maximumThreshold: number)`</br></b>
subject is between the minimumThreshold and maximumThreshold excluding these boundaries

<b>`toBeCloseToInclusive(target: number, delta: number)`</br></b>
subject is within the delta of the target, including boundaries

<b>`toBeCloseToExclusive(target: number, delta: number)`</br></b>
subject is within the delta of the target, excluding boundaries

<b>`toBeTypeOf(name: string)`</br></b>
subject is of type name

<b>`toRespondTo(name: string)`</br></b>
subject has property or function of name

<b>`toHaveLength(length: number)`</br></b>
subject (Array, Map, Set or String) has length

<b>`toHaveKey(key: any)`</br></b>
subject (Map or Object) contains key

<b>`toContain(item: any)`</br></b>
subject (Array, Set, Map, String) contains the item

<b>`toBeFalsey()`</br></b>
subject evaluates to false in a boolean context (undefined, null, NaN, 0, "" , false)

<b>`toBeTruthy()`</br></b>
subject evaluates to true in a boolean context

<b>`toBeStringContaining(text: string, caseSensitive: boolean)`</br></b>
subject (string) contains text with optional case sensitivity (default false)

<b>`toBeStringMatching(regexPattern: RegEx)`</br></b>
subject (string) matches the regexPatern

<b>`toThrow(message: string)`</br></b>
subject throws message. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message'); To pass arguments to a function that is expected to throw, use the with() function.

<b>`toThrowError(errorType: any, errorMessage: string)`</br></b>
subject throws an error of errorType with errorMessage. NOTE: function should be passed by name, NOT executed e.g. expect(myThrowingFunction).toThrow('My error Message'); To pass arguments to a function that is expected to throw an error, use the with() function.

<b>`with(arguments: any)`</br></b>
pass arguments to a function that is expected toThrow or toThrowError. The call to with() should come immediately following the expectation containing the function name e.g. expect(myThrowingFunction).with(1).toThrow('My error Message');

<b>`toHaveBeenCalled(callCount: Number)`</br></b>
subject (Spy) was called callCount times

<b>`toHaveBeenCalledWith(...args: [])`</br></b>
subject's (Spy) call history contains at least one call with specified args

<b>`toHaveBeenCalledWithFirst(...args: [])`</br></b>
subject's (Spy) first call arguments equal specified args

<b>`toHaveBeenCalledWithLast(...args: [])`</br></b>
subject's (Spy) last call arguments equal specified args

## Spies and Stubs

Flub combines the notion of spies and stubs:

<b>`spy(target: any, functionOrPropertyName: string)`</b>

a wrapper to spy on or stub an existing function or property of an object

<b>`andReturn(value: any)`</b>

stubs the spy target's attribute to return the value

<b>`andFake(function: Function)`</b>

stubs the spy target's attribute to call the function

<b>`reset()`</b>

resets a spy, cleaing the call cound and call history

<b>`restore()`</b>

restores the spy target's original function call or value

<b>`getCallCount()`</b>

returns the spy's call count. Prefer toHaveBeenCalled() matcher

<b>`getCallHistory()`</b>

returns an array of the spy's call history. Prefer toHaveBeenCalledWith() matcher

## Future development

-   Async matchers (promise resolution)
-   Randomise tests
