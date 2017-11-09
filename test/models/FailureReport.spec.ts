import { expect } from 'chai';
import * as sinon from 'sinon';

import { FailureReport, failureList } from '../../src/models/FailureReport';
import Report from '../../src/models/Report';
import MessageType from '../../src/models/MessageType';

describe('Fail', () => {

    describe('GIVEN a Fail has been created', () => {
        const failureReports: Array<Report> = new Array<Report>();
        const testFailureReport: Report = new Report('Test report', MessageType.DEFAULT);
        failureReports.push(testFailureReport);
        let fail = new FailureReport('Des', 'Chain', 'Assertion Error', failureReports, 'Trace');

        it('THEN it should be added to the list of all fails', () => {
            failureList.push(fail);
            expect(failureList).to.include(fail);
        });

        it('THEN returns the correct des', () => {
            expect(fail.des).to.equal('Des');
        });

        it('THEN returns the correct failureType', () => {
            expect(fail.failureType).to.equal('Assertion Error');
        });

        it('THEN returns the correct failureType', () => {
            expect(fail.failureMessages).to.deep.equal([testFailureReport]);
        });

        it('THEN returns the correct stack', () => {
            expect(fail.prettyTrace).to.equal('Trace');
        });

    });

});