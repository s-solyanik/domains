interface ValueObjectProps {
    [key: string]: any
}

abstract class ValueObject<T extends ValueObjectProps> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze(props) as T;
    }

    public get(): T {
        return this.props;
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }

        return Object.is(this.props, vo.props);
    }
}

export { ValueObject };
