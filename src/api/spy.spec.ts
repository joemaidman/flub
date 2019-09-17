import * as _ from 'lodash';

import Spy from '../spy/Spy';
import { spy as spyBR } from './spy';

describe('Core', () => {
    describe('spy', () => {
        const spy: Spy = spyBR(Math, 'round');

        it('should return a spy object', () => {
            expect(spy).toBeInstanceOf(Spy);
        });
    });
});
