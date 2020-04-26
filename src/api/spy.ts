import Spy from '../spy/spy';

export const spy = (target: any, functionName: string): Spy => {
    const spy: Spy = new Spy(target, functionName);
    return spy;
};
