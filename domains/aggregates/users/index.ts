import { of } from "rxjs";
import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";
import { Result } from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import { EntityState } from "domains/core/entity/with-state";

import type { UserType } from "domains/entities/users";
import { UserEntity } from "domains/entities/users";

import { UserFingerPrintAggregate } from "domains/aggregates/indentity/fingerprint";

import { UserData } from "data/user";

class UserAggregate {
    static shared = singleton((id: string) => new UserAggregate(id));

    public readonly id: IdentifierI;

    private readonly userId: string;
    private readonly state: EntityState<UserEntity, UserType>

    private constructor(id: string) {
        this.userId = id;
        this.id = UserEntity.id(id);
        this.state = new EntityState<UserEntity, UserType>(this.id, this.read, 300);
    }

    private read = () => {
        return UserData.facade.read().pipe(
            switchMap(it => EntityResult.unit(UserEntity.factory, it))
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
                    switchMap(it => EntityResult.unit(UserEntity.factory, it)),
                    switchMap(this.state.update)
                )
            })
        )
    }

    public data() {
        return this.state.data();
    }
}

export type { UserType };
export { UserAggregate };