import { tearDownEach } from './Core';
import * as _ from 'lodash';
class Hooks {
    private static instance: Hooks;
    private static setupEachHook: Function = _.noop;
    private static tearDownEachHook: Function = _.noop;
    private static tearDownHook: Function = _.noop;

    static getInstance() {
        if (!Hooks.instance) {
            Hooks.instance = new Hooks();
        }
        return Hooks.instance;
    }

    static getSetupEachHook(): Function {
        return Hooks.setupEachHook;
    }

    static setSetupEachHook(func: Function): void {
        Hooks.setupEachHook = func;
    }

    static getTearDownEachHook(): Function {
        return Hooks.tearDownEachHook;
    }

    static setTearDownEachHook(func: Function): void {
        Hooks.tearDownEachHook = func;
    }

    static getTearDownHook(): Function {
        return Hooks.tearDownHook;
    }

    static setTearDownHook(func: Function): void {
        Hooks.tearDownHook = func;
    }

    static clearHooks(): void {
        Hooks.setupEachHook = _.noop;
        Hooks.tearDownEachHook = _.noop;
        Hooks.tearDownHook = _.noop;
    }

}

export default Hooks;