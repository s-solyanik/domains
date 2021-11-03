import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityI } from "domains/core/entity/with-state";
import { EntityWithState } from "domains/core/entity/with-state";

import type { UserType } from "domains/common/users";
import { UserEntity } from "domains/common/users";

import { UserData } from "data/user";

class UserAggregate implements EntityI<UserEntity, UserType> {
    static shared = singleton((id: string) => {
        return new EntityWithState<UserEntity, UserType>(new UserAggregate(id))
    })

    public readonly ttl = 300;

    public readonly id: IdentifierI;

    constructor(id: string) {
        this.id = UserEntity.id(id);
    }

    public read = () => {
        return UserData.facade.read().pipe(
            switchMap(it => EntityResult.create(UserEntity.factory, it))
        )
    }

    public update(value: Partial<UserType>) {
        const { identifier, ...rest } = value;

        return UserData.facade.update(identifier, rest).pipe(
            switchMap(it => EntityResult.create(UserEntity.factory, it))
        )
    }
}

export type { UserType };
export { UserAggregate };