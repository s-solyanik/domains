import {switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";

import {singleton} from "utils/singleton";
import type {IdentifierI} from "utils/unique-id";

import { domainsEntry } from 'domains/core/singleton';

import type { UserType } from "domains/common/users";
import { UserEntity } from "domains/common/users";

import { UserData } from "data/user";

const TTL = 300;

class User {
    static shared = singleton((id: string) => new User(id));

    public readonly id: IdentifierI;

    private constructor(id: string) {
        this.id = UserEntity.id(id);
    }

    private get entity() {
        return domainsEntry.entity<UserEntity>(this.id, this.read);
    }

    private read = () => {
        return UserData.facade.read().pipe(
            map(it => ({
                data: UserEntity.factory(it),
                expiration: TTL
            }))
        )
    }

    public data() {
        return this.entity.data().pipe(
            map(it => it.value.get())
        );
    }

    public update(value: Partial<UserType>) {
        return this.entity.data().pipe(
            switchMap(entity => {
                return UserData.facade.update(entity.get().identifier, value).pipe(
                    tap((update) => this.entity.update(entity.update(update), TTL)),
                )
            })
        )


    }
}

export type { UserType };
export { User };