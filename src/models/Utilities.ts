import * as R from 'ramda';

export const checkType = (name: string | Array<string>, object: any): boolean => {
    typeof name === 'string'
        ? name = [name]
        : name = name;
    if (!object.constructor
        || !R.contains(object.constructor.name, name)) {
        throwing('Subject is not a '
            + name.join('/')
            + ' object');
        return false;
    }
    return true;
}

export const throwing = (message: string): void => {
    throw new Error(message);
}