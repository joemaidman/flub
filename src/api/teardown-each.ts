import HooksManager from '../hooks/hooks-manager';

export const teardownEach = (func: Function): void => {
    HooksManager.addHook('teardownEachHooks', func);
};
