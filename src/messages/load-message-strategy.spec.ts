import { loadMessageStrategies } from './load-message-strategy';

describe('loadMessageStrategies', () => {
    it('should return an array of all message strategies', () => {
        expect(loadMessageStrategies()).toHaveLength(8);
        expect(loadMessageStrategies()[0].constructor.name).toEqual(
            'DefaultMessageStrategy'
        );
        expect(loadMessageStrategies()[1].constructor.name).toEqual(
            'OKMessageStrategy'
        );
        expect(loadMessageStrategies()[2].constructor.name).toEqual(
            'ErrorMessageStrategy'
        );
        expect(loadMessageStrategies()[3].constructor.name).toEqual(
            'RootMessageStrategy'
        );
        expect(loadMessageStrategies()[4].constructor.name).toEqual(
            'ComparisonMessageStrategy'
        );
    });
});
