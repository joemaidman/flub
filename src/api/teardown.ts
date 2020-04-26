import HooksManager from '../hooks/hooks-manager';


export const teardown = (func: Function): void => {
    HooksManager.addHook('teardownHooks', func);
};
