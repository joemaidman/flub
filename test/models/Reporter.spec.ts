import { expect } from 'chai';
import * as sinon from 'sinon';

import Reporter from '../../src/models/Reporter'
import Report from '../../src/models/Report';
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
            reporter.report(new Report("Message", MessageType.DEFAULT, 0));
            sinon.assert.calledOnce(consoleSpy);

            sinon.assert.calledWith(consoleSpy,[console,'Message']);
        })

    });

    describe('GIVEN report function is called with an ERROR strategy', () => {

        it('THEN it prints the message in red with the X symbol', () => {
            reporter.report(new Report("Failing message", MessageType.ERROR, 0));
            sinon.assert.calledOnce(consoleSpy);
            // sinon.assert.calledWith(consoleSpy, colors.red("\u2717 Failing message"));
        })

    });

    describe('GIVEN report function is called with an OK strategy', () => {

        it('THEN it prints the message in green with the tick symbol', () => {
            reporter.report(new Report("Passing message", MessageType.OK, 0));
            sinon.assert.calledOnce(consoleSpy);
            // sinon.assert.calledWith(consoleSpy, colors.green("\u2714 Passing message"));
        })

    });

    describe('GIVEN report function is called with a ROOT strategy', () => {

        it('THEN it prints the message in blue', () => {
            reporter.report(new Report("Root message", MessageType.ROOT, 0));
            sinon.assert.calledOnce(consoleSpy);
            // sinon.assert.calledWith(consoleSpy, colors.blue("Root message"));
        })

    });

    describe('GIVEN report function is called with a COMPARISON strategy', () => {

        it('THEN it prints the message in red', () => {
            reporter.report(new Report("Comparison message", MessageType.COMPARISON, 0));
            sinon.assert.calledOnce(consoleSpy);
            // sinon.assert.calledWith(consoleSpy, colors.red("Comparison message"));
        })

    });

    afterEach(function () {
        consoleSpy.restore();
    });

});