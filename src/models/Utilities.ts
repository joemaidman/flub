import * as R from 'ramda';

export const checkType = (name: string | Array<string>, object: any): void => {
    typeof name === 'string'
        ? name = [name]
        : name = name;
    if (!object.constructor
        || !R.contains(object.constructor.name, name)) {
        throw new Error('Subject is not a '
            + name.join('/')
            + ' object');
    }
}