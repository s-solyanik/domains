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

import {ProfilesData} from "data/admin/users/user-list";
import {UserData} from "data/admin/users/user";

enum Action {
    NOTE = 'note',
    SUPER_LIKE = 'superlike'
}

type isDeleted = 'all'|'false'|'true';

type FiltersProps = {
    page: number
    pagesize: number
    id?: string
    query?: string
    firstName?: string
    lastName?: string
    identifier?: string
    facebookId?: string
    email?: string
    phoneNumber?: string
    gender?: 'male' | 'female' | 'other'
    community?: string
    religion?: string
    education?: string
    career?: string
    review?: string[]
    age?: string
    isDeleted?: isDeleted
};

class ProfilesAggregate {
    static shared = singleton((filters: FiltersProps) => new ProfilesAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<User>;

    private constructor(filters: FiltersProps) {
        this.id = User.id('list');
        this.filters = filters;
        this.todo = new ToDoList<User>(this.id, this.read, 0);
    }

    private read = () => {
        return ProfilesData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(User.factory, it))
        )
    }

    public delete(id: string | number) {
        return ProfilesData.facade.delete(id).pipe(
            switchMap(this.todo.remove)
        )
    }

    public sendSuperLike(id: number, recipient: number) {
        return UserData.facade.sendAction(id, {
            decision: Action.SUPER_LIKE,
            message: null,
            interestProfileId: recipient
        }).pipe(
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    public sendNote(id: number, recipient: number, message: string) {
        return UserData.facade.sendAction(id, {
            decision: Action.NOTE,
            message: message,
            interestProfileId: recipient
        }).pipe(
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    static get phones() {
        return TEST_PHONE_NUMBERS;
    }

    static get preference() {
        return UserPreferenceEntity.getDefaultPreference();
    }

    static get review() {
        return UserMetaEntity.getReview();
    }

    public data() {
        return this.todo.get().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return {
                    items: it.value?.items.map(item => ({
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

export type {UserI, FiltersProps};
export {ProfilesAggregate};