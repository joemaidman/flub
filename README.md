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

Bedrock is a lightweight javascript BDD / TDD testing framework for Node. It comprises a CLI test runner, assertion library and utilities including doubles, mocks, stubs and spies.

## Installation

'bed-rock' is available as an npm package

    $ npm install bed-rock --save-dev

Add one of the following to scripts in package.json

    'test' : 'bed-rock'

    'test:watch' : 'bed-rock --watch'

Run npm test / npm run test:watch

Bedrock will automatically load any files that match *.spec.js.

## Usage
Bedrock exposes three functions for composing tests:

```context(description, testDefinitions)```</br>
A container for one or more tests (can be nested with other contexts).

```test(description, testAssertions)```</br>
A container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be passing and a spec with any failures will fail.

```expect(actual) -> matchers```</br>
Creates an assertion for a test.

hooks


## Example tests

```js
var context = require('bed-rock').context;  
var test = require('bed-rock').test;  
var expect = require('bed-rock').expect;  

context("GIVEN that something has happened", () => {
    
    test('THEN this test should pass',() =>{
        expect(1).toEqual(1);
    });

    test('THEN this test should fail',() =>{
        expect(1).toEqual(2);
    });

})
```

## Matchers

```isEqualTo(expected)```</br>
actual value is equal to the expected using deep equality.

```isEmptyString()```</br>
actual value is an empty string

```isDefined()```</br>
actual value is not undefined

```isInstanceOf(expected)```</br>
actual value an instance of expected

```isTypeOf(expected)```</br>
actual value is of type expected

## Roadmap

~~Bin execution~~</br>
~~Watch mode~~</br>
Matchers (see below)</br>
Expectation failure details</br>
~~Virtual DOM~~</br>    
~~Stubs/Spies~~</br>
Regex matcher</br>
Time manipulation</br>
Custom configuration options</br>
~~Additional hooks (before/beforeAll/after/afterAll)~~

## Matchers

~~isEqualTo~~</br>
~~toBe</br>
~~toBeTypeOf~~</br>
~~toBeDefined~~</br>
~~toBeUndefined~~</br>
~~toBeNotNull~~</br>
~~toBeNull~~</br>
~~toBeTruthy~~</br>
~~toBeFalsy~~</br>
~~toBeLessThan~~</br>
~~toBeGreaterThan~~</br>
~~toBeLessThanOrEqualTo~~</br>
~~toBeGreaterThanOrEqualTo~~</br>
~~toBeCloseToInclusive~~</br>
~~toBeCloseToExclusive~~</br>
~~toBeBetweenInclusive~~</br>
~~toBeBetweenExclusive~~</br>
~~toHaveLength~~</br>
~~toContain~~</br>
~~toHaveKey~~</br>
~~toRespondTo~~</br>
~~throws~~</br>
~~throwsError~~</br>
~~not~~</br>

