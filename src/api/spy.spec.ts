import * as _ from 'lodash';

import Spy from '../spy/spy';
import { spy as spyBR } from './spy';


describe('spy', () => {
    const spy: Spy = spyBR(Math, 'round');

    it('should return a spy object', () => {
        expect(spy).toBeInstanceOf(Spy);
    });
});

