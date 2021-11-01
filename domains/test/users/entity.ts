import { map } from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";

import type { EntityI } from "domains/core/entity/with-state";

import type { UserType } from "domains/common/users";
import { UserEntity } from "domains/common/users";

import { UserData } from "data/user";

class UsersEntity implements EntityI<UserType> {
    public readonly ttl = 300;

    public readonly id: IdentifierI;

    constructor(id: string) {
        this.id = UserEntity.id(id);
    }

    public read = () => {
        return UserData.facade.read().pipe(
            map(it => UserEntity.factory(it))
        )
    }

    public update(value: Partial<UserType>) {
        const { identifier, ...rest } = value;

        return UserData.facade.update(identifier, rest).pipe(
            map((it) => UserEntity.factory(it)),
        )
    }
}

export type { UserType };
export { UsersEntity };