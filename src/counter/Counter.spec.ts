import { Counter } from './Counter';

describe('Counter', () => {
    beforeAll(() => {
        Counter.reset();
    });

    describe('GIVEN Counter has been called', () => {
        describe('WHEN incrementDepth has been called', () => {
            it('THEN the depth increases by 1', () => {
                Counter.incrementDepth();
                expect(Counter.depth).toEqual(1);
            });
        });

        describe('WHEN decrementDepth has been called', () => {
            it('THEN the depth decreases by 1', () => {
                Counter.decrementDepth();
                expect(Counter.depth).toEqual(0);
            });
        });

        describe('WHEN incrementTestCount has been called', () => {
            it('THEN the testCount increases by 1', () => {
                Counter.incrementTestCount();
                expect(Counter.testCount).toEqual(1);
            });
        });

        describe('WHEN incrementPassCount has been called', () => {
            it('THEN the passCount increases by 1', () => {
                Counter.incrementPassCount();
                expect(Counter.passCount).toEqual(1);
            });
        });

        describe('WHEN incrementFailCount has been called', () => {
            it('THEN the failCount increases by 1', () => {
                Counter.incrementFailCount();
                expect(Counter.failCount).toEqual(1);
            });
        });

        describe('WHEN incrementIgnoreCount has been called', () => {
            it('THEN the ignoreCount increases by 1', () => {
                Counter.incrementIgnoreCount();
                expect(Counter.ignoreCount).toEqual(1);
            });
        });

        describe('WHEN reset has been called', () => {
            it('THEN all counts reset to 0', () => {
                Counter.reset();
                expect(Counter.testCount).toEqual(0);
                expect(Counter.passCount).toEqual(0);
                expect(Counter.failCount).toEqual(0);
                expect(Counter.ignoreCount).toEqual(0);
            });
        });
    });
});
