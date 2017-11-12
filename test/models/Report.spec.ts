
import { expect } from 'chai';
import * as sinon from 'sinon';

import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';

describe('Report', () => {

    describe('GIVEN a new report has been created', () => {

        describe('WHEN it is passed a single string', () => {

            let report: Report;
            before(() => {
                report = new Report('Test report', MessageType.OK);
            });

            it('THEN it has an array of messages containing the message passed', () => {
                expect(report.messages).to.contain('Test report');
            });

            it('THEN it has the correct message type', () => {
                expect(report.messageType).to.equal(MessageType.OK);
            });

        });

        describe('WHEN it is passed multiple strings', () => {

            let report: Report;
            before(() => {
                report = new Report(['Test report A', 'Test report B'], MessageType.DEFAULT);
            });

            it('THEN it has an array of messages containing the message passed', () => {
                expect(report.messages).to.contain('Test report A');
                expect(report.messages).to.contain('Test report B');
            });

            it('THEN it has the correct message type', () => {
                expect(report.messageType).to.equal(MessageType.DEFAULT);
            });

        });

    });

});