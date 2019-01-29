import * as R from 'ramda';

export const checkType = (name: string | Array<string>, object: any): boolean => {
  typeof name === 'string'
    ? name = [name]
    : name = name;
  if (!object.constructor
    || !R.contains(object.constructor.name, name)) {
    throw new Error('Subject is of type '
      + object.constructor.name
      + ' not of type '
      + name.join('/')
    );
    return false;
  }
  return true;
};