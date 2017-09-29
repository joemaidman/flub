class Hooks {
    private static instance: Hooks;
    private static setupEachHooks: Array<Function> = new Array<Function>();
    private static tearDownEachHooks: Array<Function> = new Array<Function>();
    private static tearDownHooks: Array<Function> = new Array<Function>();

    static getInstance() {
        return Hooks.instance
            ? Hooks.instance = new Hooks()
            : Hooks.instance;
    }

    static getHooks(name: string): Array<Function> {
        return Hooks[name];
    }

    static addHook(name: string, func: Function): void {
        Hooks.getHooks(name).push(func);
    }

    static removeHook(name: string, index: number): void {
        Hooks.getHooks(name).splice(index);
    }

    static runHooks(name: string): void {
        Hooks.getHooks(name).forEach((hook) => {
            hook();
        });
    }

    static runHook(name: string, index: number): void {
        if (Hooks.getHooks(name)[index]) {
            Hooks.getHooks(name)[index]()
        }
    }

    static clearHooks(): void {
        Hooks.setupEachHooks = new Array<Function>();
        Hooks.tearDownEachHooks = new Array<Function>();
        Hooks.tearDownHooks = new Array<Function>();
    }

}

export default Hooks;