import { expect } from 'chai';
import * as sinon from 'sinon';

import Expectation from '../../src/models/Expectation';
import Reporter from '../../src/models/Reporter';
import Report from '../../src/models/Report';
import Spy from '../../src/models/Spy';
import MessageType from '../../src/models/MessageType';
import * as Counter from '../../src/models/Counter';
import { failureList, FailureReport } from '../../src/models/FailureReport';

describe('Expectation', () => {

    let expectation: Expectation;
    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let reporters: Array<Reporter>;

    before(() => {
        // Stub supresses console log output during testing
        // Switch to spy for full logging
        reportStub = sinon.stub(Reporter, 'report');
    });

    after(function () {
        reportStub.restore();
    });

    describe('Given a reporter is passed', () => {

        it('THEN it can call the reporter to report', () => {
            expectation = new Expectation(1, 'Description');
            expectation.toEqual(1);
            sinon.assert.calledOnce(reportStub);
        });

    });

    describe('Matchers', () => {

        describe('GIVEN toBe is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBe(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBe(2)).to.be.false;
                });

            });

        });

        describe('GIVEN isEqual is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation({ a: '1', b: '2' }, 'Description');
                    expect(expectation.toEqual({ a: '1', b: '2' })).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation({ a: '1', b: '2' }, 'Description');
                    expect(expectation.toEqual({ a: '2', b: '2' })).to.be.false;
                });

            });

        });


        describe('GIVEN toBeDefined is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeDefined()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(undefined, 'Description');
                    expect(expectation.toBeDefined()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeUndefined is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(undefined, 'Description');
                    expect(expectation.toBeUndefined()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeUndefined()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeNull is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(null, 'Description');
                    expect(expectation.toBeNull()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeNull()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeNotNull is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeNotNull()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(null, 'Description');
                    expect(expectation.toBeNotNull()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeGreaterThan is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeGreaterThan(0)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeGreaterThan(2)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeGreaterThanOrEqualTo is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeGreaterThanOrEqualTo(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeGreaterThanOrEqualTo(2)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeLessThan is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeLessThan(2)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeLessThan(0)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeLessThanOrEqualTo is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeLessThanOrEqualTo(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeLessThanOrEqualTo(0)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeBetweenInclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeBetweenInclusive(1, 2)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeBetweenInclusive(2, 3)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeBetweenExclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeBetweenExclusive(0, 2)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeBetweenExclusive(0, 1)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeStringContaining (case insensitive) is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringContaining('World')).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {


                it('THEN it evaluates to false', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringContaining('NotThere')).to.be.false;
                });

            });

        });

        describe('GIVEN toBeStringContaining (case sensitive) is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringContaining('World', true)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringContaining('world', true)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeStringMatching is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringMatching(/^Hello/)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {


                it('THEN it evaluates to false', () => {
                    expectation = new Expectation('HelloWorld', 'Description');
                    expect(expectation.toBeStringMatching(/^NotThere/)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeTypeOf is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeTypeOf('number')).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toBeTypeOf('string')).to.be.false;
                });

            });

        });

        describe('GIVEN toRespondTo is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation('A string', 'Description');
                    expect(expectation.toRespondTo('toLowerCase')).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 'Description');
                    expect(expectation.toRespondTo('toLowerCase')).to.be.false;
                });

            });

        });

        describe('GIVEN toHaveLength is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation([1, 2, 3], 'Description');
                    expect(expectation.toHaveLength(3)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation([1, 2, 3], 'Description');
                    expect(expectation.toHaveLength(2)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeFalsey is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(false, 'Description');
                    expect(expectation.toBeFalsey()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(true, 'Description');
                    expect(expectation.toBeFalsey()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeTruthy is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(true, 'Description');
                    expect(expectation.toBeTruthy()).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(false, 'Description');
                    expect(expectation.toBeTruthy()).to.be.false;
                });

            });

        });

        describe('GIVEN toBeCloseToInclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1.5, 'Description');
                    expect(expectation.toBeCloseToInclusive(1, 0.5)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1.5, 'Description');
                    expect(expectation.toBeCloseToInclusive(1, 0.4)).to.be.false;
                });

            });

        });

        describe('GIVEN toBeCloseToExclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1.5, 'Description');
                    expect(expectation.toBeCloseToExclusive(1, 0.6)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1.5, 'Description');
                    expect(expectation.toBeCloseToExclusive(1, 0.5)).to.be.false;
                });

            });

        });

        describe('GIVEN toContain is called on an Array', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation([1, 2, 3], 'Description');
                    expect(expectation.toContain(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation([1, 2, 3], 'Description');
                    expect(expectation.toContain(4)).to.be.false;
                });

            });

        });


        describe('GIVEN toContain is called on an Set', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(new Set().add(1), 'Description');
                    expect(expectation.toContain(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(new Set().add(1), 'Description');
                    expect(expectation.toContain(2)).to.be.false;
                });

            });

        });

        describe('GIVEN toContain is called on an object', () => {

            it('THEN it throws an error', () => {
                expectation = new Expectation({ a: 1, b: 2 }, 'Description');

                try {
                    expectation.toContain(1);
                }
                catch (e) {
                    expect(e.message).to.equal('Subject is of type Object not of type Array/Set/Map/String');
                }
            });

        });

        describe('GIVEN toHaveKey is called on a Map', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {

                    expectation = new Expectation(new Map().set(1, 2), 'Description');
                    expect(expectation.toHaveKey(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(new Map().set(1, 2), 'Description');
                    expect(expectation.toHaveKey(4)).to.be.false;
                });

            });

        });

        describe('GIVEN toHaveKey is called on an Object', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation({ a: 1, b: 2 }, 'Description');
                    expect(expectation.toHaveKey('a')).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation({ a: 1, b: 2 }, 'Description');
                    expect(expectation.toHaveKey('c')).to.be.false;
                });

            });

        });

        describe('GIVEN toHaveBeenCalled', () => {

            let testSpy: Spy;

            beforeEach(() => {
                testSpy = new Spy(Math, 'round');
            });

            after(() => {
                testSpy.restore();
            });

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    Math.round(1);
                    expectation = new Expectation(testSpy, 'Description');
                    expect(expectation.toHaveBeenCalled(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(testSpy, 'Description');
                    expect(expectation.toHaveBeenCalled(2)).to.be.false;
                });

            });

            describe('WHEN the subject is not a spy ', () => {

                it('THEN it throws an error', () => {
                    expectation = new Expectation(1, 'Description');

                    try {
                        expectation.toHaveBeenCalled(1);
                    }
                    catch (e) {
                        expect(e.message).to.equal('Subject is of type Number not of type Spy');
                    }
                });

            });

        });

        describe('GIVEN toHaveBeenCalledWith', () => {

            let testSpy: Spy;

            beforeEach(() => {
                testSpy = new Spy(Math, 'round');
            });

            after(() => {
                testSpy.restore();
            });

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    Math.round(1);
                    expectation = new Expectation(testSpy, 'Description');
                    expect(expectation.toHaveBeenCalledWith(1)).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    Math.round(1);
                    expectation = new Expectation(testSpy, 'Description');
                    expect(expectation.toHaveBeenCalledWith(2)).to.be.false;
                });

            });

            describe('WHEN the subject is not a spy ', () => {

                it('THEN it throws an error', () => {
                    expectation = new Expectation(1, 'Description');

                    try {
                        expectation.toHaveBeenCalledWith(1);
                    }
                    catch (e) {
                        expect(e.message).to.equal('Subject is of type Number not of type Spy');
                    }
                });

            });

        });

        describe('GIVEN toThrow', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(() => { throw ('Error: Test error'); }, 'Description');
                    expect(expectation.toThrow('Error: Test error')).to.be.true;
                });

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(() => { }, 'Description');
                    expect(expectation.toThrow('Test error')).to.be.false;
                });

            });

        });


    });

    describe('GIVEN with', () => {

        it('should set throwsArgs property and returns the expectation object', () => {
            expectation = new Expectation(1, 'Description');
            const returnedExpectation: Expectation = expectation.with(1, 2, 3);
            expect(expectation.throwsArgs).to.deep.equal([1, 2, 3]);
            expect(returnedExpectation).to.equal(expectation);
        });
    });

    describe('GIVEN assert', () => {

        describe('WHEN called on a regular expectation', () => {

            describe('WHEN it is passed a true equalityTest', () => {

                let assertResult: boolean;

                before(() => {
                    expectation = new Expectation(1, 'Description');
                    Counter.reset();
                    reportStub.reset();
                    assertResult = expectation.assert(true);
                });

                it('THEN it called the Reporter with its description and an OK status', () => {
                    sinon.assert.calledOnce(reportStub);
                    sinon.assert.calledWith(reportStub, new Report(['Description'], MessageType.OK));
                });

                it('THEN it increments the passed test count', () => {
                    expect(Counter.passCount).to.equal(1);
                    expect(Counter.failCount).to.equal(0);
                });


                it('THEN it returns true', () => {
                    expect(assertResult).to.be.true;
                });

            });

            describe('WHEN it is passed a false equalityTest', () => {
                let assertResult: boolean;

                before(() => {
                    expectation = new Expectation(1, 'Description');
                    Counter.reset();
                    reportStub.reset();
                    failureList.length = 0;
                    assertResult = expectation.assert(false);
                });

                it('THEN it called the Reporter with its description and an ERROR status', () => {
                    sinon.assert.calledOnce(reportStub);
                    sinon.assert.calledWith(reportStub, new Report(['Description'], MessageType.ERROR));
                });

                it('THEN it increments the failed test count', () => {
                    expect(Counter.failCount).to.equal(1);
                    expect(Counter.passCount).to.equal(0);
                });

                it('THEN it populates the expectation failureMessages', () => {
                    expect(expectation.failureMessages).to.deep.equal([new Report([], MessageType.COMPARISON)]);
                });

                it('THEN it is added to the global failureList', () => {
                    expect(failureList).to.have.length(1);
                });


                it('THEN it returns false', () => {
                    expect(assertResult).to.be.false;
                });

            });

        });

        describe('WHEN called on an inverted not expectation', () => {

            before(() => {
                expectation = new Expectation(1, 'Description');
                expectation.not = new Expectation(1, 'Description', true);
                sinon.stub(expectation.not, 'failureDetails').returns(['1', '2', '3', '4']);
            });

            describe('WHEN it is passed a true equalityTest', () => {

                it('THEN it returns true', () => {
                    expect(expectation.not.assert(false)).to.be.true;
                });

            });

            describe('WHEN it is passed a false equalityTest', () => {

                it('THEN it returns false', () => {
                    expect(expectation.not.assert(true)).to.be.false;
                });

                it('THEN it inserts not into the expectation failureDetails', () => {
                    expect(expectation.not.failureDetails[2]).to.equal('not undefined');
                });

            });

        });

    });

});