/*
This is an example flub test file showing usage of most matchers.
To use, run npm i flub --save-dev and move this file in your project.
Rename the file to include your test file extention (e.g. .spec.js).
Set your test script to 'flub' in package.json, including any flags required.
Run 'npm test' in the CLI.
*/

var Flub = require('flub');
var context = require('flub').context;
var xcontext = require('flub').xcontext;
var test = require('flub').test;
var ftest = require('flub').ftest;
var xtest = require('flub').xtest;
var expect = require('flub').expect;
var setup = require('flub').setup;
var teardown = require('flub').teardown;
var setupEach = require('flub').setupEach;
var teardownEach = require('flub').teardownEach;

context('Matchers', () => {
    context('Given toEqual', () => {
        context('When you pass 1 and 1', () => {
            test('THEN it passes', () => {
                expect(1).toEqual(1);
            });
        });
        context('When you pass 1 and 2', () => {
            test('THEN it fails', () => {
                expect(1).toEqual(3);
            });
        });
    });

    context('Given not.toEqual', () => {
        context('When you pass 1 and 2', () => {
            test('THEN it passes', () => {
                expect(1).not.toEqual(2);
            });
        });
        context('When you pass 1 and 1', () => {
            test('THEN it fails', () => {
                expect(1).not.toEqual(1);
            });
        });
    });

    context('Given toBe', () => {
        context('When you pass 1 and 1', () => {
            test('THEN it passes', () => {
                expect(1).toBe(1);
            });
        });
        context('When you pass 1 and 2', () => {
            test('THEN it fails', () => {
                expect(1).toBe(3);
            });
        });
    });

    context('Given not.toBe', () => {
        context('When you pass 1 and 2', () => {
            test('THEN it passes', () => {
                expect(1).not.toBe(2);
            });
        });
        context('When you pass 1 and 1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBe(1);
            });
        });
    });

    context('Given toBeDefined', () => {
        context('When you pass Math', () => {
            test('THEN it passes', () => {
                expect(Math).toBeDefined();
            });
        });
        context('When you pass undefined', () => {
            test('THEN it fails', () => {
                expect(undefined).toBeDefined();
            });
        });
    });

    context('Given not.toBeDefined', () => {
        context('When you pass undefined', () => {
            test('THEN it passes', () => {
                expect(undefined).not.toBeDefined();
            });
        });
        context('When you pass Math', () => {
            test('THEN it fails', () => {
                expect(Math).not.toBeDefined();
            });
        });
    });

    context('Given toBeUndefined', () => {
        context('When you pass undefined', () => {
            test('THEN it passes', () => {
                expect(undefined).toBeUndefined();
            });
        });
        context('When you pass Math', () => {
            test('THEN it fails', () => {
                expect(Math).toBeUndefined();
            });
        });
    });

    context('Given not.toBeDefined', () => {
        context('When you pass Math', () => {
            test('THEN it passes', () => {
                expect(Math).not.toBeUndefined();
            });
        });
        context('When you pass undefined', () => {
            test('THEN it fails', () => {
                expect(undefined).not.toBeUndefined();
            });
        });
    });

    context('Given toBeNull', () => {
        context('When you pass null', () => {
            test('THEN it passes', () => {
                expect(null).toBeNull();
            });
        });
        context('When you pass Math', () => {
            test('THEN it fails', () => {
                expect(Math).toBeNull();
            });
        });
    });

    context('Given not.toBeNull', () => {
        context('When you pass Math', () => {
            test('THEN it passes', () => {
                expect(Math).not.toBeNull();
            });
        });
        context('When you pass null', () => {
            test('THEN it fails', () => {
                expect(null).not.toBeNull();
            });
        });
    });

    context('Given toBeNotNull', () => {
        context('When you pass Math', () => {
            test('THEN it passes', () => {
                expect(Math).toBeNotNull();
            });
        });
        context('When you pass null', () => {
            test('THEN it fails', () => {
                expect(null).toBeNotNull();
            });
        });
    });

    context('Given not.toBeNotNull', () => {
        context('When you pass null', () => {
            test('THEN it passes', () => {
                expect(null).not.toBeNotNull();
            });
        });
        context('When you pass Math', () => {
            test('THEN it fails', () => {
                expect(Math).not.toBeNotNull();
            });
        });
    });

    context('Given toBeGreaterThanOrEqualTo', () => {
        context('When you pass 1 and 1', () => {
            test('THEN it passes', () => {
                expect(1).toBeGreaterThanOrEqualTo(1);
            });
        });
        context('When you pass 1 and 1.1', () => {
            test('THEN it fails', () => {
                expect(1).toBeGreaterThanOrEqualTo(1.1);
            });
        });
    });

    context('Given not.toBeGreaterThanOrEqualTo', () => {
        context('When you pass 1 and 1.1', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeGreaterThanOrEqualTo(1.1);
            });
        });
        context('When you pass 1 and 1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeGreaterThanOrEqualTo(1);
            });
        });
    });

    context('Given toBeLessThanOrEqualTo', () => {
        context('When you pass 1 and 1', () => {
            test('THEN it passes', () => {
                expect(1).toBeLessThanOrEqualTo(1);
            });
        });
        context('When you pass 1 and 0.9', () => {
            test('THEN it fails', () => {
                expect(1).toBeLessThanOrEqualTo(0.9);
            });
        });
    });

    context('Given not.toBeLessThanOrEqualTo', () => {
        context('When you pass 1 and 2', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeLessThanOrEqualTo(0);
            });
        });
        context('When you pass 1 and 1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeLessThanOrEqualTo(2);
            });
        });
    });

    context('Given toBeGreaterThan', () => {
        context('When you pass 1 and 0.9', () => {
            test('THEN it passes', () => {
                expect(1).toBeGreaterThan(0.9);
            });
        });
        context('When you pass 1 and 1', () => {
            test('THEN it fails', () => {
                expect(1).toBeGreaterThan(1);
            });
        });
    });

    context('Given not.toBeGreaterThan', () => {
        context('When you pass 1 and 1', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeGreaterThan(1);
            });
        });
        context('When you pass 1 and 0.9', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeGreaterThan(0.9);
            });
        });
    });

    context('Given toBeLessThan', () => {
        context('When you pass 1 and 2', () => {
            test('THEN it passes', () => {
                expect(1).toBeLessThan(2);
            });
        });
        context('When you pass 1 and 0', () => {
            test('THEN it fails', () => {
                expect(1).toBeLessThan(0);
            });
        });
    });

    context('Given not.toBeLessThan', () => {
        context('When you pass 1 and 0', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeLessThan(0);
            });
        });
        context('When you pass 1 and 2', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeLessThan(2);
            });
        });
    });

    context('Given toBeBetweenInclusive', () => {
        context('When you pass 1, 0 and 2', () => {
            test('THEN it passes', () => {
                expect(1).toBeBetweenInclusive(0, 1);
            });
        });

        context('When you pass 1, 2 and 3', () => {
            test('THEN it fails', () => {
                expect(1).toBeBetweenInclusive(2, 3);
            });
        });
    });

    context('Given not.toBeBetweenInclusive', () => {
        context('When you pass 1, 2 and 3', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeBetweenInclusive(2, 3);
            });
        });

        context('When you pass 1, 0 and 1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeBetweenInclusive(0, 1);
            });
        });
    });

    context('Given toBeBetweenExclusive', () => {
        context('When you pass 1, 0 and 1.1', () => {
            test('THEN it passes', () => {
                expect(1).toBeBetweenExclusive(0, 1.1);
            });
        });

        context('When you pass 1, 2 and 1', () => {
            test('THEN it fails', () => {
                expect(1).toBeBetweenExclusive(2, 1);
            });
        });
    });

    context('Given not.toBeBetweenExclusive', () => {
        context('When you pass 1, 2 and 3', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeBetweenExclusive(2, 3);
            });
        });

        context('When you pass 1, 0 and 1.2', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeBetweenExclusive(0, 1.2);
            });
        });
    });

    context('Given toBeCloseToInclusive', () => {
        context('When you pass 1, 0.9 and 0.1', () => {
            test('THEN it passes', () => {
                expect(1).toBeCloseToInclusive(0.9, 0.1);
            });
        });

        context('When you pass 1, 0.9 and 0.05', () => {
            test('THEN it fails', () => {
                expect(1).toBeCloseToInclusive(0.9, 0.05);
            });
        });
    });

    context('Given not.toBeCloseToInclusive', () => {
        context('When you pass 1, 0.5 and 0.1', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeCloseToInclusive(0.5, 0.1);
            });
        });

        context('When you pass 1, 1 and 0.1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeCloseToInclusive(1, 0.1);
            });
        });
    });

    context('Given toBeCloseToExclusive', () => {
        context('When you pass 1, 0.91 and 0.1', () => {
            test('THEN it passes', () => {
                expect(1).toBeCloseToExclusive(0.91, 0.1);
            });
        });

        context('When you pass 1, 0.95 and 0.05', () => {
            test('THEN it fails', () => {
                expect(1).toBeCloseToExclusive(0.95, 0.05);
            });
        });
    });

    context('Given not.toBeCloseToExclusive', () => {
        context('When you pass 1, 0.9 and 0.1', () => {
            test('THEN it passes', () => {
                expect(1).not.toBeCloseToExclusive(0.9, 0.1);
            });
        });

        context('When you pass 1, 1 and 0.1', () => {
            test('THEN it fails', () => {
                expect(1).not.toBeCloseToExclusive(0.92, 0.1);
            });
        });
    });

    context('Given toHaveKey', () => {
        context('When you test a map', () => {
            test('THEN it passes', () => {
                expect(new Map().set(1, 1)).toHaveKey(1);
            });

            test('THEN it fails', () => {
                expect(new Map().set(1, 1)).toHaveKey(2);
            });
        });

        context('When you test an object', () => {
            test('THEN it passes', () => {
                expect({ a: 1 }).toHaveKey('a');
            });

            test('THEN it fails', () => {
                expect({ a: 1 }).toHaveKey('b');
            });
        });
    });

    context('Given not.haveKey', () => {
        context('When you test a map', () => {
            test('THEN it passes', () => {
                expect(new Map().set(1, 1)).not.toHaveKey(2);
            });

            test('THEN it fails', () => {
                expect(new Map().set(1, 1)).not.toHaveKey(1);
            });
        });

        context('When you test an object', () => {
            test('THEN it passes', () => {
                expect({ a: 1 }).not.toHaveKey('b');
            });

            test('THEN it fails', () => {
                expect({ a: 1 }).not.toHaveKey('a');
            });
        });
    });

    context('Given toContain', () => {
        context('When you test an array', () => {
            test('THEN it passes', () => {
                expect([1, 2]).toContain(1);
            });

            test('THEN it fails', () => {
                expect([1, 2]).toContain(3);
            });
        });

        context('When you test a map', () => {
            test('THEN it passes', () => {
                expect(new Map().set(1, 1)).toContain(1);
            });

            test('THEN it fails', () => {
                expect(new Map().set(1, 1)).toContain(2);
            });
        });

        context('When you test a set', () => {
            test('THEN it passes', () => {
                expect(new Set().add(1)).toContain(1);
            });

            test('THEN it fails', () => {
                expect(new Set().add(1)).toContain(2);
            });
        });

        context('When you test a string', () => {
            test('THEN it passes', () => {
                expect('Test').toContain('Test');
            });

            test('THEN it fails', () => {
                expect('Test').toContain('Wrong');
            });
        });
    });

    context('Given not.toContain', () => {
        context('When you test an array', () => {
            test('THEN it passes', () => {
                expect([1, 2]).not.toContain(3);
            });

            test('THEN it fails', () => {
                expect([1, 2]).not.toContain(1);
            });
        });

        context('When you test a map', () => {
            test('THEN it passes', () => {
                expect(new Map().set(1, 1)).not.toContain(2);
            });

            test('THEN it fails', () => {
                expect(new Map().set(1, 1)).not.toContain(1);
            });
        });

        context('When you test a set', () => {
            test('THEN it passes', () => {
                expect(new Set().add(1)).not.toContain(2);
            });

            test('THEN it fails', () => {
                expect(new Set().add(1)).not.toContain(1);
            });
        });

        context('When you test a string', () => {
            test('THEN it passes', () => {
                expect('Test').not.toContain('Wrong');
            });

            test('THEN it fails', () => {
                expect('Test').not.toContain('Test');
            });
        });
    });

    context('Given toBeStringContaining', () => {
        context('WHEN case sensitive', () => {
            test('THEN it passes', () => {
                expect('Hello World').toBeStringContaining('World', true);
            });

            test('THEN it fails', () => {
                expect('Hello World').toBeStringContaining('world', true);
            });
        });

        context('WHEN case insensitive', () => {
            test('THEN it passes', () => {
                expect('Hello World').toBeStringContaining('world', false);
            });

            test('THEN it fails', () => {
                expect('Hello World').toBeStringContaining('Wrong', false);
            });
        });
    });

    context('Given not.toBeStringContaining', () => {
        context('WHEN case sensitive', () => {
            test('THEN it passes', () => {
                expect('Hello World').not.toBeStringContaining('Wrong', true);
            });

            test('THEN it fails', () => {
                expect('Hello World').not.toBeStringContaining('World', true);
            });
        });

        context('WHEN case insensitive', () => {
            test('THEN it passes', () => {
                expect('Hello World').not.toBeStringContaining('wrong', false);
            });

            test('THEN it fails', () => {
                expect('Hello World').not.toBeStringContaining('hello', false);
            });
        });
    });

    context('Given toBeStringMatching', () => {
        test('THEN it passes', () => {
            expect('Hello World').toBeStringMatching(new RegExp(/^Hello/));
        });

        test('THEN it fails', () => {
            expect('Hello World').toBeStringMatching(
                new RegExp(/^wrong/),
                true
            );
        });
    });

    context('Given not.toBeStringMatching', () => {
        test('THEN it passes', () => {
            expect('Hello World').not.toBeStringMatching(new RegExp(/^wrong/));
        });

        test('THEN it fails', () => {
            expect('Hello World').not.toBeStringMatching(new RegExp(/^Hello/));
        });
    });

    context('Given toBeTypeOf', () => {
        test('THEN it passes', () => {
            expect(1).toBeTypeOf('Number');
        });

        test('THEN it fails', () => {
            expect(1).toBeTypeOf('String');
        });
    });

    context('Given not.toBeTypeOf', () => {
        test('THEN it passes', () => {
            expect('Hello World').not.toBeTypeOf('Number');
        });

        test('THEN it fails', () => {
            expect('Hello World').not.toBeTypeOf('String');
        });
    });

    context('Given toRespondTo', () => {
        test('THEN it passes', () => {
            expect(Math).toRespondTo('round');
        });

        test('THEN it fails', () => {
            expect(Math).toRespondTo('hi');
        });
    });

    context('Given not.toRespondTo', () => {
        test('THEN it passes', () => {
            expect('Hello World').not.toRespondTo('round');
        });

        test('THEN it fails', () => {
            expect('Hello World').not.toRespondTo('length');
        });
    });

    context('Given toBeFalsey', () => {
        test('THEN it passes', () => {
            expect(false).toBeFalsey();
        });

        test('THEN it fails', () => {
            expect(true).toBeFalsey();
        });
    });

    context('Given not.toBeFalsey', () => {
        test('THEN it passes', () => {
            expect(true).not.toBeFalsey();
        });

        test('THEN it fails', () => {
            expect(false).not.toBeFalsey();
        });
    });

    context('Given toBeTruthy', () => {
        test('THEN it passes', () => {
            expect(true).toBeTruthy();
        });

        test('THEN it fails', () => {
            expect(false).toBeTruthy();
        });
    });

    context('Given not.toBeTruthy', () => {
        test('THEN it passes', () => {
            expect(false).not.toBeTruthy();
        });

        test('THEN it fails', () => {
            expect(true).not.toBeTruthy();
        });
    });

    context('Given toHaveBeenCalled()', () => {
        let mySpy;

        setup(() => {
            mySpy = Flub.spy(Math, 'round');
        });

        teardown(() => {
            mySpy.restore();
        });

        context('When the spy has been called once', () => {
            test('Then it passed because the spy has been called 1 time', () => {
                Math.round(1);
                expect(mySpy).toHaveBeenCalled(1);
            });
        });
        context('When the spy has been called twice', () => {
            test('Then it fails because the spy it has been called 2 times', () => {
                Math.round(1);
                expect(mySpy).toHaveBeenCalled(1);
            });
        });
    });

    context('Given not.toHaveBeenCalled()', () => {
        let mySpy;

        setup(() => {
            mySpy = Flub.spy(Math, 'round');
            Math.round(1);
        });

        teardown(() => {
            mySpy.restore();
        });

        context('When the spy has been called once', () => {
            test('Then it passed because the spy has not been called 2 times', () => {
                expect(mySpy).not.toHaveBeenCalled(2);
            });
        });
        context('When the spy has been called once', () => {
            test('Then it fails because the spy has been called 1 times', () => {
                expect(mySpy).not.toHaveBeenCalled(1);
            });
        });
    });

    context('Given toHaveBeenCalledWith()', () => {
        let mySpy;

        setup(() => {
            mySpy = Flub.spy(Math, 'round');
        });

        teardown(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 1', () => {
            test('Then it passed because the spy has been called with 1', () => {
                Math.round(1);
                expect(mySpy).toHaveBeenCalledWith(1);
            });
        });
        context('When the spy has been called', () => {
            test('Then it fails because the spy was not called with 3', () => {
                expect(mySpy).toHaveBeenCalledWith(3);
            });
        });
    });

    context('Given not.toHaveBeenCalledWith()', () => {
        let mySpy;

        setup(() => {
            mySpy = Flub.spy(Math, 'round');
        });

        teardown(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 1', () => {
            test('Then it passed because the spy has not been called with 2', () => {
                Math.round(1);
                expect(mySpy).not.toHaveBeenCalledWith(2);
            });
        });
        context('When the spy has been called with 1', () => {
            test('Then it fails because the spy was called with 1', () => {
                Math.round(2);
                expect(mySpy).not.toHaveBeenCalledWith(1);
            });
        });
    });

    context('Given toHaveBeenCalledWithFirst()', () => {
        let mySpy;

        setupEach(() => {
            if (mySpy) {
                mySpy.reset();
            }
            mySpy = Flub.spy(Math, 'round');
        });

        teardownEach(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 1 and then 2', () => {
            test('Then it passed because the spy has been called first with 1', () => {
                Math.round(1);
                Math.round(2);
                expect(mySpy).toHaveBeenCalledWithFirst(1);
            });
        });
        context('When the spy has not been called first with 1', () => {
            test('Then it fails because the spy was not called with 1', () => {
                expect(mySpy).toHaveBeenCalledWithFirst(1);
            });
        });
    });

    context('Given not.toHaveBeenCalledWithFirst()', () => {
        let mySpy;

        setupEach(() => {
            if (mySpy) {
                mySpy.reset();
            }
            mySpy = Flub.spy(Math, 'round');
        });

        teardownEach(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 2 and then 1', () => {
            test('Then it passed because the spy has been called first with 1', () => {
                Math.round(2);
                expect(mySpy).not.toHaveBeenCalledWithFirst(1);
            });
        });
        context('When the spy has been called with 1 and then 2', () => {
            test('Then it fails because the spy was not called with 1', () => {
                Math.round(1);
                Math.round(2);
                expect(mySpy).not.toHaveBeenCalledWithFirst(1);
            });
        });
    });

    context('Given toHaveBeenCalledWithLast()', () => {
        let mySpy;

        setupEach(() => {
            if (mySpy) {
                mySpy.reset();
            }
            mySpy = Flub.spy(Math, 'round');
        });

        teardownEach(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 1 and then 2', () => {
            test('Then it passed because the spy has been called last with 2', () => {
                Math.round(1);
                Math.round(2);
                expect(mySpy).toHaveBeenCalledWithLast(2);
            });
        });
        context('When the spy has not been called', () => {
            test('Then it fails because the spy was not called with 1', () => {
                expect(mySpy).toHaveBeenCalledWithLast(1);
            });
        });
    });

    context('Given not.toHaveBeenCalledWithLast()', () => {
        let mySpy;

        setupEach(() => {
            if (mySpy) {
                mySpy.reset();
            }
            mySpy = Flub.spy(Math, 'round');
        });

        teardownEach(() => {
            mySpy.restore();
        });

        context('When the spy has been called with 2', () => {
            test('Then it passed because the spy has not been called last with 1', () => {
                Math.round(2);
                expect(mySpy).not.toHaveBeenCalledWithLast(1);
            });
        });
        context('When the spy has been called with 1 and then 2', () => {
            test('Then it fails because the spy was called with 2', () => {
                Math.round(1);
                Math.round(2);
                expect(mySpy).not.toHaveBeenCalledWithLast(2);
            });
        });
    });

    context('Given toHaveLength()', () => {
        context('When the subject is an Array', () => {
            let testArray = [1, 2, 3, 4, 5];
            test('Then it passes as the array has 5 elements', () => {
                expect(testArray).toHaveLength(5);
            });
            test('Then it fails as the array does not have 6 elements', () => {
                expect(testArray).toHaveLength(6);
            });
        });

        context('When the subject is a Set', () => {
            let testSet = new Set();
            testSet.add({ 1: 1 });
            test('Then it passes as the set has 5 elements', () => {
                expect(testSet).toHaveLength(1);
            });
            test('Then it fails as the array does not have 6 elements', () => {
                expect(testSet).toHaveLength(2);
            });
        });

        context('When the subject is a Map', () => {
            let testMap = new Map();
            testMap.set({ 1: 1 });
            test('Then it passes as the map has 1 elements', () => {
                expect(testMap).toHaveLength(1);
            });
            test('Then it fails as the map does not have 2 elements', () => {
                expect(testMap).toHaveLength(2);
            });
        });

        context('When the subject is a String', () => {
            test('Then it passes as string has 1 character', () => {
                expect('T').toHaveLength(1);
            });

            test('Then it fails as the string does not have 2 elements', () => {
                expect('T').toHaveLength(2);
            });
        });
    });

    context('Given not.toHaveLength()', () => {
        context('When the subject is an Array', () => {
            let testArray = [1, 2, 3, 4, 5];
            test('Then it passes as the array has 5 elements', () => {
                expect(testArray).not.toHaveLength(4);
            });
            test('Then it fails as the array does not have 6 elements', () => {
                expect(testArray).not.toHaveLength(5);
            });
        });

        context('When the subject is a Set', () => {
            let testSet = new Set();
            testSet.add({ 1: 1 });
            test('Then it passes as the set has 5 elements', () => {
                expect(testSet).not.toHaveLength(2);
            });
            test('Then it fails as the array does not have 6 elements', () => {
                expect(testSet).not.toHaveLength(1);
            });
        });

        context('When the subject is a Map', () => {
            let testMap = new Map();
            testMap.set({ 1: 1 });
            test('Then it passes as the map has 1 elements', () => {
                expect(testMap).not.toHaveLength(2);
            });
            test('Then it fails as the map does not have 2 elements', () => {
                expect(testMap).not.toHaveLength(1);
            });
        });

        context('When the subject is a String', () => {
            test('Then it passes as string has 1 character', () => {
                expect('T').not.toHaveLength(2);
            });

            test('Then it fails as the string does not have 2 elements', () => {
                expect('T').not.toHaveLength(1);
            });
        });
    });

    context('Given toThrow()', () => {
        context('When it throws', () => {
            let throwingFunction = () => {
                throw 'Error message';
            };
            test('Then it passes because it throws', () => {
                expect(throwingFunction).toThrow('Error message');
            });

            test('Then it fails because it did not throw', () => {
                expect(Math.round)
                    .with(1)
                    .toThrow('Error message');
            });
        });
    });

    context('Given toThrow().with', () => {
        context('When it throws with args', () => {
            let throwingFunction = num => {
                if (num > 1) {
                    throw 'Invalid number';
                }
            };
            test('Then it passes because it throws', () => {
                expect(throwingFunction)
                    .with(2)
                    .toThrow('Invalid number');
            });

            test('Then it fails because it did not throw', () => {
                expect(Math.round)
                    .with(2)
                    .toThrow('Invalid number');
            });
        });
    });

    context('Given toThrow().with.not', () => {
        context('When it throws with args', () => {
            let throwingFunction = num => {
                if (num > 1) {
                    throw 'Invalid number';
                }
            };
            test('Then it passes because it throws', () => {
                expect(throwingFunction)
                    .with(1)
                    .not.toThrow('Invalid number');
            });

            test('Then it fails because it throws', () => {
                expect(throwingFunction)
                    .with(2)
                    .not.toThrow('Invalid number');
            });
        });
    });

    context('Given toThrowError()', () => {
        context('When it throws an error', () => {
            let throwingFunction = () => {
                throw new RangeError('Range message');
            };
            test('Then it passes because it throws a RangeError', () => {
                expect(throwingFunction).toThrowError(
                    RangeError,
                    'Range message'
                );
            });

            test('Then it fails because it did not throw a RangeError', () => {
                expect(() => {
                    throw new Error('Normal error');
                }).toThrowError(RangeError, 'Range message');
            });
        });
    });

    context('Given toThrowError().with', () => {
        context('When it throws an error', () => {
            let throwingFunction = num => {
                if (num != 2) {
                    throw new RangeError('Range message');
                }
            };
            test('Then it passes because it throws a RangeError', () => {
                expect(throwingFunction)
                    .with(1)
                    .toThrowError(RangeError, 'Range message');
            });

            test('Then it fails because it did not throw a RangeError', () => {
                expect(throwingFunction)
                    .with(2)
                    .toThrowError(RangeError, 'Range message');
            });
        });
    });

    context('Given toThrowError().with.not', () => {
        context('When it throws an error', () => {
            let throwingFunction = num => {
                if (num != 2) {
                    throw new RangeError('Range message');
                }
            };
            test('Then it passes because it throws a RangeError', () => {
                expect(throwingFunction)
                    .with(2)
                    .not.toThrowError(RangeError, 'Range message');
            });

            test('Then it fails because it did not throw a RangeError', () => {
                expect(throwingFunction)
                    .with(1)
                    .not.toThrowError(RangeError, 'Range message');
            });
        });
    });
});
