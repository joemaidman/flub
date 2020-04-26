import Report from './report';
import MessageType from '../messages/message-type';
import { FailureReport } from './failure-report';

describe('FailureReport', () => {
    const failureReports: Array<Report> = new Array<Report>();
    const testFailureReport: Report = new Report(
        'Test report',
        MessageType.DEFAULT
    );
    failureReports.push(testFailureReport);
    let fail = new FailureReport(
        'Des',
        'Chain',
        'Assertion Error',
        failureReports,
        'Trace'
    );

    it('should have the correct des', () => {
        expect(fail.des).toEqual('Des');
    });

    it('should have the correct failureType', () => {
        expect(fail.failureType).toEqual('Assertion Error');
    });

    it('should have the correct failureMessages', () => {
        expect(fail.failureMessages).toEqual([testFailureReport]);
    });

    it('should have the correct stack trace', () => {
        expect(fail.prettyTrace).toEqual('Trace');
    });
});
