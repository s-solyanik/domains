import type { IdentifierI } from "utils/unique-id";
import { UID } from 'utils/unique-id';

import type { ValueObject } from 'domains/core/entity/value-object';

interface EntityLikeProps {
    id: IdentifierI
    readonly value: ValueObject<any>
    readonly entities?: Record<string, Entity<any>>
}

interface EntityLike<Props extends EntityLikeProps> {
    equals(object?: EntityLike<Props>): boolean
}

abstract class Entity<Props extends EntityLikeProps> implements EntityLike<Props> {
    protected readonly props: Props;

    protected constructor(props: Props) {
        if(!Entity.isEntityId(props.id)) {
            throw new Error(`Id is not an instance of ${Entity.name}`);
        }

        this.props = Object.freeze(props);
    }

    protected static createId(value: string|number): IdentifierI {
        return UID.factory(Entity.name, value);
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

    public get id() {
        return this.props.id;
    }

    public get(): any {
        throw new Error(`Get method is not implemented ${this.props.id.toString()}`);
    }

    public get snapshot() {
        return this.props.value.get();
    }

    static id(...args: any[]): IdentifierI {
        throw new Error(`id getter method is not implemented ${args}`);
    }

    static isEntityId(id?: IdentifierI) {
        return UID.factory(Entity.name, 'test').isInstanceOf(id);
    }

    static isEntity(v: any): v is Entity<any> {
        return v instanceof Entity;
    }

    static factory(...args: any[]) {
        throw new Error(`Method is not implemented ${args}`);
    }
}

export { Entity };
