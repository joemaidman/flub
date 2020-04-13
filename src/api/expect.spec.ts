import Expectation from '../expectation/Expectation';
import { expect as expectBR } from './expect';


describe('expect', () => {
    const assertion: Expectation = expectBR(1);

    it('should return a new Expectation with the correct subject', () => {
        expect(assertion).toBeInstanceOf(Expectation);
        expect(assertion.subject).toEqual(1);
    });
});

