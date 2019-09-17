import HooksManager from '../hooks/HookManager';

export const tearDown = (func: Function): void => {
    HooksManager.addHook('tearDownHooks', func);
};
