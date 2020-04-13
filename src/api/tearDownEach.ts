import HooksManager from '../hooks/HookManager';

export const tearDownEach = (func: Function): void => {
    HooksManager.addHook('tearDownEachHooks', func);
};
