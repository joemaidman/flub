import Report from './Report';
import MessageType from '../messages/MessageType';

describe('Report', () => {
    describe('GIVEN a new report has been created', () => {
        describe('WHEN it is passed a single string', () => {
            let report: Report;
            beforeAll(() => {
                report = new Report('Test report', MessageType.OK);
            });

            it('THEN it has an array of messages containing the message passed', () => {
                expect(report.messages).toContain('Test report');
            });

            it('THEN it has the correct message type', () => {
                expect(report.messageType).toEqual(MessageType.OK);
            });
        });

        describe('WHEN it is passed multiple strings', () => {
            let report: Report;
            beforeAll(() => {
                report = new Report(
                    ['Test report A', 'Test report B'],
                    MessageType.DEFAULT
                );
            });

            it('THEN it has an array of messages containing the message passed', () => {
                expect(report.messages).toContain('Test report A');
                expect(report.messages).toContain('Test report B');
            });

            it('THEN it has the correct message type', () => {
                expect(report.messageType).toEqual(MessageType.DEFAULT);
            });
        });
    });
});
