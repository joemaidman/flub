import * as R from 'ramda';

import MessageType from './MessageType';
import * as Counter from './Counter';

export const checkType = (name: string | Array<string>, object: any): boolean => {
    typeof name === 'string'
        ? name = [name]
        : name = name;
    if (!object.constructor
        || !R.contains(object.constructor.name, name)) {
        throwing('Subject is of type '
            + object.constructor.name
            + ' not of type '
            + name.join('/')
        );
        return false;
    }
    return true;
};

export const throwing = (message: string): void => {
    throw new Error(message);
};