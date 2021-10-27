export interface IdentifierI {
    _value: string|number
    equals(id?: IdentifierI): boolean
    toString(): string
    toValue(): string|number
}

interface UIDI {
    new(value: string|number): UID
}

class UID implements IdentifierI {
    readonly _value: string|number;
    static readonly context = new Map<string, UIDI>();

    constructor(value: string|number) {
        this._value = value;
    }

    equals(id?: IdentifierI): boolean {
        if (id === null || id === undefined) {
            return false;
        }

        if (!(id instanceof this.constructor)) {
            return false;
        }

        return id.toValue() === this.toValue();
    }

    toString() {
        const constructorName = this.constructor.name;
        return `${constructorName}(${String(this.toValue())})`;
    }

    toValue(): string|number {
        return this._value;
    }

    static factory(name: string, value: string|number) {
        const contextInstance = UID.context.get(name);

        if(contextInstance) {
            return new contextInstance(value);
        }

        const instance = {
            [name]: class extends UID { }
        };

        UID.context.set(name, instance[name]);

        return new instance[name](value);
    }
}

export { UID };
