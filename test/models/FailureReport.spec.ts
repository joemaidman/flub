import { expect } from 'chai';
import * as sinon from 'sinon';

import { FailureReport, failureList } from '../../src/models/FailureReport';
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';

describe('FailureReport', () => {

    const failureReports: Array<Report> = new Array<Report>();
    const testFailureReport: Report = new Report('Test report', MessageType.DEFAULT);
    failureReports.push(testFailureReport);
    let fail = new FailureReport('Des', 'Chain', 'Assertion Error', failureReports, 'Trace');

    it('should have the correct des', () => {
        expect(fail.des).to.equal('Des');
    });

    it('should have the correct failureType', () => {
        expect(fail.failureType).to.equal('Assertion Error');
    });

    it('should have the correct failureMessages', () => {
        expect(fail.failureMessages).to.deep.equal([testFailureReport]);
    });

    it('should have the correct stack trace', () => {
        expect(fail.prettyTrace).to.equal('Trace');
    });
});