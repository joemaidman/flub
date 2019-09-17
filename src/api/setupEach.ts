import HooksManager from '../hooks/HookManager';

export const setupEach = (func: Function): void => {
    HooksManager.addHook('setupEachHooks', func);
};
