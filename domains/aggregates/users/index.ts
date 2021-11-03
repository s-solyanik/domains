import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityI } from "domains/core/entity/with-state";
import { EntityWithState } from "domains/core/entity/with-state";

import type { UserType } from "domains/common/users";
import { UserEntity } from "domains/common/users";

import { UserFingerPrintAggregate } from "domains/aggregates/indentity/fingerprint";

import { UserData } from "data/user";
import {Result} from "utils/result/dto";

class UserAggregate implements EntityI<UserEntity, UserType> {
    static shared = singleton((id: string) => {
        return new EntityWithState<UserEntity, UserType>(new UserAggregate(id))
    })

    public readonly ttl = 300;

    public userId: string;
    public readonly id: IdentifierI;

    constructor(id: string) {
        this.userId = id;
        this.id = UserEntity.id(id);
    }

    public read = () => {
        return UserData.facade.read().pipe(
            switchMap(it => EntityResult.create(UserEntity.factory, it))
        )
    }

    public update(value: Partial<UserType>) {
        const { identifier, ...rest } = value;

        return UserFingerPrintAggregate.shared(this.userId).data().pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                return UserData.facade.update(identifier, rest, it.value).pipe(
                    switchMap(it => EntityResult.create(UserEntity.factory, it))
                )
            })
        )
    }
}

export type { UserType };
export { UserAggregate };