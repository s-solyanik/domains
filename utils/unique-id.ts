export interface IdentifierI {
    _value: string|number
    equals(id?: IdentifierI): boolean
    toString(): string
    toValue(): string|number
    isInstanceOf(id?: IdentifierI): boolean
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

    public equals(id?: IdentifierI): boolean {
        if (id === null || id === undefined) {
            return false;
        }

        if (!(id instanceof this.constructor)) {
            return false;
        }

        return id.toValue() === this.toValue();
    }

    public toString() {
        const constructorName = this.constructor.name;
        return `${constructorName}(${String(this.toValue())})`;
    }

    public toValue(): string|number {
        return this._value;
    }

    public isInstanceOf(id?: IdentifierI) {
        if (id === null || id === undefined) {
            return false;
        }

        return id instanceof this.constructor;
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
