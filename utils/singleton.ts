type Key = string;

type Value = any;

function singleton<Result, Parameters extends any[]>(
    createInstance: (...args: Parameters) => Result
): (...args: Parameters) => Result {

    let storage: Map<Key, Value>;

    return (...args) => {

        if (!storage) {
            storage = new Map();
        }

        const key = JSON.stringify(args);

        let instance = storage.get(key);

        if (!instance) {
            instance = createInstance(...args);
            storage.set(key, instance);
        }

        return instance;
    };
}

export { singleton };
