import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type { UserI } from "domains/admin/entities/user";
import { User } from "domains/admin/entities/user";

import {ProfilesData} from "data/users/profiles";
import {Result} from "utils/result/dto";

class ProfilesAggregate {
    static shared = singleton(() => new ProfilesAggregate());

    public readonly id: IdentifierI;
    private readonly todo: ToDoList<User>;

    private constructor() {
        this.id = User.id('list');
        this.todo = new ToDoList<User>(this.id, this.read, 0);
    }

    private read = () => {
        return ProfilesData.facade.read().pipe(
            switchMap(it => EntityResult.array(User.factory, it))
        )
    }

    public create(value: UserI) {
        return ProfilesData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(User.factory, it)),
            switchMap(this.todo.update)
        )
    }

    public update(value: Partial<UserI>) {
        return ProfilesData.facade.update(value).pipe(
            switchMap(it => EntityResult.unit(User.factory, it)),
            switchMap(this.todo.update)
        )
    }

    public delete(id: string | number) {
        return ProfilesData.facade.delete(id).pipe(
            switchMap(this.todo.remove)
        )
    }

    public data() {
        return this.todo.get().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return {
                    items: it.value.items.map(item => ({
                        data: item.get().data.get(),
                        location: item.get().location.get(),
                        media: item.get().media.get(),
                        meta: item.get().meta.get(),
                    })),
                    total: it.value.total
                }
            })
        );
    }
}

export type {UserI};
export {ProfilesAggregate};