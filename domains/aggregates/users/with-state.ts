import { singleton } from "utils/singleton";

import { EntityWithState } from "domains/core/entity/with-state";

import type { UserEntity, UserType } from "domains/common/users";
import { UsersEntity } from "domains/aggregates/users/entity";

class UsersEntityWithState {
    static shared = singleton((id: string) => {
        return new EntityWithState<UserEntity, UserType>(new UsersEntity(id))
    })
}

export { UsersEntityWithState };