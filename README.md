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

    'test' : 'bed-rock --watch'

Bedrock will automatically load any files that match *.spec.js.

## Usage
Bedrock exposes three functions for composing tests:

```context(description, testDefinitions)```</br>
A container for one or more tests (can be nested with other contexts).

```test(description, testAssertions)```</br>
A container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be passing and a spec with any failures will fail.

```expect(actual) -> matchers```</br>
Creates an assertion for a test.

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

~~bin execution~~</br>
~~Watch mode~~</br>
Matchers (see below)</br>
Virtual DOM</br>
Stubs/Spies</br>
Regex matcher</br>
Time manipulation</br>
Callback matchers</br>
Custom configuration options

## Matchers

~~isEqualTo~~</br>
~~isEmptyString~~</br>
~~isDefined~~</br>
~~isInstanceof~~</br>
~~isType~~</br>
~~isUndefined~~</br>
~~isNull~~</br>
~~isTruthy~~</br>
~~isFalsy~~</br>
~~contains~~</br>
~~isLessThan~~</br>
~~isGreaterThan~~</br>
~~isLessThanOrEqualTo~~</br>
~~isGreaterThanOrEqualTo~~</br>
isCloseTo</br>
throws</br>
throwsError</br>
~~isBetween~~</br>
~~hasLength~~</br>
~~respondsTo~~</br>
not</br>
~~toBe~~</br>

