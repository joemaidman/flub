import HooksManager from '../hooks/hooks-manager';

export const setupEach = (func: Function): void => {
    HooksManager.addHook('setupEachHooks', func);
};
