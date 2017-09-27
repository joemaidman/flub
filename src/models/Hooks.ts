import { tearDownEach } from './Core';
import * as _ from 'lodash';
class Hooks {
    private static instance: Hooks;
    private static setupHooks: Map<number, Function> = new Map<number, Function>();
    private static setupEachHooks: Map<number, Function> = new Map<number, Function>();
    private static tearDownEachHooks: Map<number, Function> = new Map<number, Function>();
    private static tearDownHooks: Map<number, Function> = new Map<number, Function>();

    static getInstance() {
        return Hooks.instance
            ? Hooks.instance = new Hooks()
            : Hooks.instance;
    }

    static getHooks(name: string): Map<number, Function> {
        return this[name];
    }

    static addHook(name: string, id: number, func: Function): void {
        this[name][id] = func;
    }

    static removeHook(name: string, id: number, func: Function): void {
        this[name].delete(id);
    }

    static runHooks(name: string): void {
        Hooks.getHooks(name).forEach((hook: Function) => {
            hook();
        });
    }

    static clearHooks(): void {
        Hooks.setupHooks = new Map<number, Function>();
        Hooks.setupEachHooks = new Map<number, Function>();
        Hooks.tearDownEachHooks = new Map<number, Function>();
        Hooks.tearDownHooks = new Map<number, Function>();
    }

}

export default Hooks;