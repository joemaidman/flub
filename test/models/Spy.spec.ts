import { reset } from './../../src/models/Counter';

import { expect } from 'chai';
import * as sinon from 'sinon';

import Spy from '../../src/models/Spy';

describe('Spy', () => {

    describe('GIVEN a new spy has been created', () => {
        let spy: Spy;

        describe('WHEN the spy has been called', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round');
                Math.round(1);
            });

            afterEach(() => {
                spy.restore();
            });

            it('THEN it is included in the list of all spies', () => {
                expect(Spy.getSpyList()).to.include(spy);
            });

            it('THEN it increments its call count', () => {
                expect(spy.getCallCount()).to.equal(1);
            });

            it('THEN it saves its call history', () => {
                expect(spy.getCallHistory()).to.deep.equal([[1]])
            });
        });

        describe('GIVEN andReturn has been set', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round').andReturn(true);
            });

            afterEach(() => {
                spy.restore();
            });

            it('THEN it returns the override value', () => {
                expect(Math.round(1)).to.equal(true);
            });
        });

        describe('GIVEN andFake has been set', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round').andFake(() => { return true });
            });

            afterEach(() => {
                spy.restore();
            });

            it('THEN it runs the override function', () => {
                expect(Math.round(1)).to.equal(true);
            });
        });

        describe('GIVEN the spy has been manually called', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round');
                spy.call();
            });

            afterEach(() => {
                spy.restore();
            });

            it('THEN it runs the spy', () => {
                expect(spy.getCallCount()).to.equal(1);
            });
        });

        describe('GIVEN the spy has been reset', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round').andReturn(true);
                spy.call();
                spy.reset();
            });

            afterEach(() => {
                spy.restore();
            });

            it('THEN it has a call count of 0', () => {
                expect(spy.getCallCount()).to.equal(0);
            });

            it('THEN it has no call history', () => {
                expect(spy.getCallHistory()).to.be.empty;
            });
        });

        describe('GIVEN the spy has been restored', () => {

            beforeEach(() => {
                spy = new Spy(Math, 'round').andFake(() => {return 50});
                spy.restore();
            });

            it('THEN it runs the restored original function', () => {
                expect(spy.call(1)).to.equal(1);
            });

            it('THEN it has been removed from the list of all spies', () => {
                expect(Spy.getSpyList()).to.be.empty;
            });
        });

    });

});
