import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type { UserI } from "domains/admin/user";
import { User } from "domains/admin/user";

import {UserData} from "data/users/profile";
import {Result} from "utils/result/dto";

class UserAggregate {
    static shared = singleton((id: string) => new UserAggregate(id));

    public readonly id: IdentifierI;
    private readonly state: State<User>;

    private constructor(id: string) {
        this.id = User.id(id);
        this.state = new State<User>(this.id, this.read, 0);
    }

    private read = () => {
        return UserData.facade.read().pipe(
            switchMap(it => EntityResult.unit(User.factory, it))
        )
    }

    public create(value: UserI) {
        return UserData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(User.factory, it)),
            switchMap(this.state.update)
        )
    }

    public update(value: Partial<UserI>) {
        return UserData.facade.update(value).pipe(
            switchMap(it => EntityResult.unit(User.factory, it)),
            switchMap(this.state.update)
        )
    }

    public delete(id: string | number) {
        return UserData.facade.delete(id).pipe(
            switchMap(this.state.delete)
        )
    }

    public data() {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return {
                    data: it.value.get().data.get(),
                    location: it.value.get().location.get(),
                    media: it.value.get().media.get(),
                    meta: it.value.get().meta.get(),
                }
            })
        );
    }
}

export type {UserI};
export {UserAggregate};