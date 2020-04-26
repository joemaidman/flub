import * as _ from 'lodash';

import MessageType from './message-type';
import { MessageStrategy } from './strategies/message-strategy';
import { loadMessageStrategies } from './load-message-strategy';
import { OKMessageStrategy } from './strategies/ok-message-strategy';

export const getMessageStrategy = (
    messageType: MessageType
): MessageStrategy => {
    return (
        _.find(loadMessageStrategies(), (strategy: MessageStrategy) => {
            return strategy.handles(messageType);
        }) || new OKMessageStrategy()
    );
};
