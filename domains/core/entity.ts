import type { ValueObject } from 'domains/core/value-object';
import {IdentifierI} from "utils/unique-id";

export interface EntityLikeProps {
    id: IdentifierI
    readonly value: ValueObject<any>|ValueObject<any>[]
}

export interface EntityLike<Props extends EntityLikeProps> {
    equals(object?: EntityLike<Props>): boolean
}

abstract class Entity<Props extends EntityLikeProps> implements EntityLike<Props> {
    static idName = 'EntityId';

    private readonly props: Props;

    protected constructor(props: Props) {
        this.props = Object.freeze(props);
    }

    public equals(object?: Entity<Props>): boolean {

        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!Entity.isEntity(object)) {
            return false;
        }

        return this.props.id.equals(object.props.id);
    }

    public get value(): Pick<Props, 'value'>['value'] {
        return this.props.value;
    }

    static id(...args: any[]): IdentifierI {
        throw new Error(`id getter method is not implemented ${args}`);
    }

    public get snapshot() {
        return Array.isArray(this.props.value)
            ? this.props.value.map(value => value.get())
            : this.props.value.get();
    }

    static isEntity(v: any): v is Entity<any> {
        return v instanceof Entity;
    }

    static factory(...args: any[]) {
        throw new Error(`Method is not implemented ${args}`);
    }
}

export { Entity };
