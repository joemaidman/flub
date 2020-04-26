import { MessageStrategy } from './strategies/message-strategy';
import { DefaultMessageStrategy } from './strategies/default-message-strategy';
import { OKMessageStrategy } from './strategies/ok-message-strategy';
import { ErrorMessageStrategy } from './strategies/error-message-strategy';
import { RootMessageStrategy } from './strategies/root-message-strategy';
import { ComparisonMessageStrategy } from './strategies/comparison-message-strategy';
import { StackMessageStrategy } from './strategies/stack-message-strategy';
import { IgnoredTestMessageStrategy } from './strategies/Ignored-test-message-strategy';
import { IgnoredContextMessageStrategy } from './strategies/ignored-context-message-strategy';

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
