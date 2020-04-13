import ContextChain from './ContextChain';

describe('ContextChain', () => {
    beforeAll(() => {
        ContextChain.reset();
    });

    afterAll(() => {
        ContextChain.reset();
    });

    it('should have a chain', () => {
        expect(ContextChain.chain).toBeDefined();
    });

    describe('push', () => {
        it('should add an item to the chain', () => {
            ContextChain.push('1');
            expect(ContextChain.chain).toEqual(['1']);
        });
    });

    describe('pop', () => {
        it('should remove the last item from the chain', () => {
            ContextChain.pop();
            expect(ContextChain.chain).toHaveLength(0);
        });
    });
});
