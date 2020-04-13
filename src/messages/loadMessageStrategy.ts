import { MessageStrategy } from './strategies/MessageStrategy';
import { DefaultMessageStrategy } from './strategies/DefaultMessageStrategy';
import { OKMessageStrategy } from './strategies/OKMessageStrategy';
import { ErrorMessageStrategy } from './strategies/ErrorMessageStrategy';
import { RootMessageStrategy } from './strategies/RootMessageStrategy';
import { ComparisonMessageStrategy } from './strategies/ComparisonMessageStrategy';
import { StackMessageStrategy } from './strategies/StackMessageStrategy';
import { IgnoredTestMessageStrategy } from './strategies/IgnoredTestMessageStrategy';
import { IgnoredContextMessageStrategy } from './strategies/IgnoredContextMessageStrategy';

export const loadMessageStrategies = (): Array<MessageStrategy> => {
    return [
        new DefaultMessageStrategy(),
        new OKMessageStrategy(),
        new ErrorMessageStrategy(),
        new RootMessageStrategy(),
        new ComparisonMessageStrategy(),
        new StackMessageStrategy(),
        new IgnoredTestMessageStrategy(),
        new IgnoredContextMessageStrategy(),
    ];
};
