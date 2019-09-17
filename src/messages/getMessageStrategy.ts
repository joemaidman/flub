import * as _ from 'lodash';

import MessageType from './MessageType';
import { MessageStrategy } from './strategies/MessageStrategy';
import { loadMessageStrategies } from './loadMessageStrategy';
import { OKMessageStrategy } from './strategies/OKMessageStrategy';

export const getMessageStrategy = (
    messageType: MessageType
): MessageStrategy => {
    return (
        _.find(loadMessageStrategies(), (strategy: MessageStrategy) => {
            return strategy.handles(messageType);
        }) || new OKMessageStrategy()
    );
};
