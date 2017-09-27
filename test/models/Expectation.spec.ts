import { expect } from 'chai';
import * as sinon from 'sinon';

import Expectation from '../../src/models/Expectation'
import Reporter from '../../src/models/Reporter'

describe('Expectation', () => {

    let expectation: Expectation;
    let reporter: Reporter;
    let reportStub: sinon.SinonSpy;
    let reporters: Array<Reporter>;

    before(() => {
        reporter = Reporter.getInstance();
        reportStub = sinon.spy(reporter, 'report');
    })

    describe('Given a reporter is passed', () => {

        it('THEN it can call the reporter to report', () => {
            expectation = new Expectation(1, 0, 'Description');
            expectation.toEqual(1);
            sinon.assert.calledOnce(reportStub);
        })

    })

    describe('Matchers', () => {

        describe('GIVEN isEqual is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toEqual(1)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toEqual(2)).to.be.false;
                })

            });

        });

        describe('GIVEN toBe is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBe(1)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBe(2)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeDefined is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeDefined()).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(undefined, 0, 'Description');
                    expect(expectation.toBeDefined()).to.be.false;
                })

            });

        });

        describe('GIVEN toBeNull is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(null, 0, 'Description');
                    expect(expectation.toBeNull()).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeNull()).to.be.false;
                })

            });

        });

        describe('GIVEN toBeGreaterThan is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeGreaterThan(0)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeGreaterThan(2)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeLessThan is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeLessThan(2)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeLessThan(0)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeBetweenInclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeBetweenInclusive(1, 2)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeBetweenInclusive(2, 3)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeBetweenExclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeBetweenExclusive(0, 2)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeBetweenExclusive(0, 1)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeTypeOf is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeTypeOf('number')).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toBeTypeOf('string')).to.be.false;
                })

            });

        });

        describe('GIVEN toRespondTo is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation('A string', 0, 'Description');
                    expect(expectation.toRespondTo('toLowerCase')).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1, 0, 'Description');
                    expect(expectation.toRespondTo('toLowerCase')).to.be.false;
                })

            });

        });


        describe('GIVEN toHaveLength is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation([1, 2, 3], 0, 'Description');
                    expect(expectation.toHaveLength(3)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation([1, 2, 3], 0, 'Description');
                    expect(expectation.toHaveLength(2)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeFalsey is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(false, 0, 'Description');
                    expect(expectation.toBeFalsey()).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(true, 0, 'Description');
                    expect(expectation.toBeFalsey()).to.be.false;
                })

            });

        });

        describe('GIVEN toBeTruthy is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(true, 0, 'Description');
                    expect(expectation.toBeTruthy()).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(false, 0, 'Description');
                    expect(expectation.toBeTruthy()).to.be.false;
                })

            });

        });

        describe('GIVEN toBeCloseToInclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1.5, 0, 'Description');
                    expect(expectation.toBeCloseToInclusive(1, 0.5)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1.5, 0, 'Description');
                    expect(expectation.toBeCloseToInclusive(1, 0.4)).to.be.false;
                })

            });

        });

        describe('GIVEN toBeCloseToExclusive is called', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(1.5, 0, 'Description');
                    expect(expectation.toBeCloseToExclusive(1, 0.6)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(1.5, 0, 'Description');
                    expect(expectation.toBeCloseToExclusive(1, 0.5)).to.be.false;
                })

            });

        });

        describe('GIVEN toContain is called on an Array', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation([1, 2, 3], 0, 'Description');
                    expect(expectation.toContain(1)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation([1, 2, 3], 0, 'Description');
                    expect(expectation.toContain(4)).to.be.false;
                })

            });

        });


        describe('GIVEN toContain is called on an Set', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(new Set().add(1), 0, 'Description');
                    expect(expectation.toContain(1)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(new Set().add(1), 0, 'Description');
                    expect(expectation.toContain(2)).to.be.false;
                })

            });

        });

        describe('GIVEN hasKey is called on an Map', () => {

            describe('WHEN a true expectation is made', () => {

                it('THEN it evaluates to true', () => {
                    expectation = new Expectation(new Map().set(1, 2), 0, 'Description');
                    expect(expectation.toHaveKey(1)).to.be.true;
                })

            });

            describe('WHEN a false expectation is made', () => {

                it('THEN it evaluates to false', () => {
                    expectation = new Expectation(new Map().set(1, 2), 0, 'Description');
                    expect(expectation.toHaveKey(4)).to.be.false;
                })

            });

        });

    });

});