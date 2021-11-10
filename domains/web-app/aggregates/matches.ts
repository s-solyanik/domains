import {of} from "rxjs";
import {map, switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import {User} from "domains/web-app/entities/user";

import { UserFingerPrintAggregate } from "domains/aggregates/indentity/fingerprint";

import {UsersMatchesData} from "data/web-app/users/matches";

enum ACTION {
    LIKE = 'like',
    DISLIKE = 'dislike'
}

class UserMatchesAggregate {
    static shared = singleton(() => new UserMatchesAggregate());

    public readonly id: IdentifierI;
    private readonly todo: ToDoList<User>;

    private constructor() {
        this.id = User.id('matches');
        this.todo = new ToDoList<User>(this.id, this.read, 300);
    }

    private read = () => {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return UsersMatchesData.facade.read(it.value).pipe(
                    switchMap(it => EntityResult.array(User.factory, it)),
                )
            })
        )
    }

    private action(id: string, action: ACTION) {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return UsersMatchesData.facade.create(id, action, it.value).pipe(
                    switchMap(EntityResult.errorOrSuccess)
                )
            })
        )
    }

    public like(id: string) {
        return this.action(id, ACTION.LIKE);
    }

    public dislike(id: string) {
        return this.action(id, ACTION.DISLIKE);
    }

    public data() {
        return this.todo.get().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(
                    it.value?.items.map(item => ({
                        data: item.get().data.get(),
                        location: item.get().location.get(),
                        media: item.get().media.get(),
                        meta: item.get().meta.get(),
                    }))
                )
            })
        );
    }
}

export {UserMatchesAggregate, ACTION};