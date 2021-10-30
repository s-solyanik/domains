import { Observable } from "rxjs";
import type {IdentifierI} from "utils/unique-id";
import { UID } from 'utils/unique-id';

import type { ValueObject } from 'domains/core/value-object';


interface EntityLikeProps {
    id: IdentifierI
    readonly value: ValueObject<any>
}

interface EntityLike<Props extends EntityLikeProps> {
    equals(object?: EntityLike<Props>): boolean
}

export interface AggregateFacade<T> {
    id: IdentifierI
    read(): Observable<{ data: T, expiration: number }>
}

const entityTestId = UID.factory('EntityId', 'test');

abstract class Entity<Props extends EntityLikeProps> implements EntityLike<Props> {
    static idName = 'EntityId';

    protected readonly props: Props;

    protected constructor(props: Props) {
        if(!entityTestId.isInstanceOf(props.id)) {
            throw new Error('Id is not an instance of EntityId');
        }

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

    public get snapshot() {
        return this.props.value.get();
    }

    static id(...args: any[]): IdentifierI {
        throw new Error(`id getter method is not implemented ${args}`);
    }

    static isEntity(v: any): v is Entity<any> {
        return v instanceof Entity;
    }

    static factory(...args: any[]) {
        throw new Error(`Method is not implemented ${args}`);
    }
}

export { Entity };
