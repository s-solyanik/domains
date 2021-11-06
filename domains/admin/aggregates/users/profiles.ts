import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import { TEST_PHONE_NUMBERS } from "domains/entities/users.meta";
import { UserPreferenceEntity } from "domains/entities/users.preference";
import { UserMetaEntity } from "domains/entities/users.meta";
import type { UserI } from "domains/admin/entities/user";
import { User } from "domains/admin/entities/user";

import {ProfilesData} from "data/users/profiles";

enum Action {
    NOTE = 'note',
    SUPER_LIKE = 'superlike'
}

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

    public sendSuperLike(id: number, recipient: number) {
        return ProfilesData.facade.sendAction(id, {
            decision: Action.SUPER_LIKE,
            message: null,
            interestProfileId: recipient
        }).pipe(
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    public sendNote(id: number, recipient: number, message: string) {
        return ProfilesData.facade.sendAction(id, {
            decision: Action.NOTE,
            message: message,
            interestProfileId: recipient
        }).pipe(
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    static getTestPhoneNumbers() {
        return TEST_PHONE_NUMBERS;
    }

    static preference() {
        return UserPreferenceEntity.getDefaultPreference();
    }

    static review() {
        return UserMetaEntity.getReview();
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