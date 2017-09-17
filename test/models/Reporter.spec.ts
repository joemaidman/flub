import { expect } from 'chai';
import * as sinon from 'sinon';
import * as colors from 'chalk'

import Reporter from '../../src/models/Reporter'
import MessageType from '../../src/models/MessageType'

describe('Reporter', () => {

    let consoleSpy: sinon.SinonSpy;
    let reporter: Reporter;

    beforeEach(() => {
        reporter = Reporter.getInstance();
        consoleSpy = sinon.stub(console, 'log');
    })

    describe('GIVEN report function is called with a DEFAULT strategy', () => {

        it('THEN it prints the message in white', () => {
            reporter.report("Message", MessageType.DEFAULT, 0);
            sinon.assert.calledOnce(consoleSpy);
            sinon.assert.calledWith(consoleSpy, colors.white("Message"));
        })

    });

    describe('GIVEN report function is called with an ERROR strategy', () => {

        it('THEN it prints the message in red with the X symbol', () => {
            reporter.report("Failing message", MessageType.ERROR, 0);
            sinon.assert.calledOnce(consoleSpy);
            sinon.assert.calledWith(consoleSpy, colors.red("\u2717 Failing message"));
        })

    });

    describe('GIVEN report function is called with an OK strategy', () => {

        it('THEN it prints the message in green with the tick symbol', () => {
            reporter.report("Passing message", MessageType.OK, 0);
            sinon.assert.calledOnce(consoleSpy);
            sinon.assert.calledWith(consoleSpy, colors.green("\u2714 Passing message"));
        })

    });

    describe('GIVEN report function is called with a ROOT strategy', () => {

        it('THEN it prints the message in blue', () => {
            reporter.report("Root message", MessageType.ROOT, 0);
            sinon.assert.calledOnce(consoleSpy);
            sinon.assert.calledWith(consoleSpy, colors.blue("[Root message]"));
        })

    });

    describe('GIVEN report function is called with a COMPARISON strategy', () => {

        it('THEN it prints the message in red', () => {
            reporter.report("Comparison message", MessageType.COMPARISON, 0);
            sinon.assert.calledOnce(consoleSpy);
            sinon.assert.calledWith(consoleSpy, colors.red("Comparison message"));
        })

    });

    afterEach(function () {
        consoleSpy.restore();
    });

});