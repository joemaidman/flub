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

Bedrock is a lightweight javascript BDD / TDD testing framework for Node. It comprises a CLI test runner, assertion library and testing utilities including test doubles, mocks and spies.

## Installation

'bed-rock' is available as an npm package

    $ npm install bed-rock --save-dev

Add one of the following to scripts in package.json

    $ 'test' : 'bed-rock'

    $ 'test' : 'bed-rock --watch'

Bedrock will automatically load any files that match *.spec.js.

## Usage
Bedrock exposes three functions for composing tests:

$ context(description, testDefinitions)
A container for one or more tests (can be nested with other contexts).

$ it(description, testAssertions)
A container for a single test. Can contain one or more assertions. A spec whose expectations all succeed will be passing and a spec with any failures will fail.

$ assert(actual) -> matchers
Creates an assertion for a test.

## Example tests

```js
var context = require('bed-rock').context;  
var it = require('bed-rock').it;  
var assert = require('bed-rock').assert;  

context("GIVEN that something has happened", () => {
    
    it('THEN this test should pass',() =>{
        assert(1).isEqualTo(1);
    });

    it('THEN this test should fail',() =>{
        assert(1).isEqualTo(2);
    });

})
```

## Matchers

$ equals()
actual value is equal to the expected using deep equality.

$ emptyString()
actual value is an empty string

## Roadmap

~~bin execution command~~</br>
~~--watch mode~~</br>
Matchers (see below)</br>
Virtual DOM</br>
Stubs/Spies</br>
Mocks</br>
Regex matcher</br>
Time manipulation</br>

## Matchers

~~isEqualTo~~</br>
~~isEmptyString~~</br>
~~isDefined~~</br>
~~isInstanceof~~</br>
~~isType~~</br>
not</br>
isUndefined</br>
isNull</br>
isTruthy</br>
isFalsy</br>
contains</br>
isLessThan</br>
isGreaterThan</br>
isCloseTo</br>
throws</br>
throwsError</br>
isBetween</br>
hasLength</br>
respondsTo</br>