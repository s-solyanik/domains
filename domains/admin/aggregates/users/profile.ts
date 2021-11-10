import {of, Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result, SuccessfulResult} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {UserDefaultPreferencesType} from "domains/entities/users.preference";
import {UserPreferenceEntity} from "domains/entities/users.preference";

import type {UserI} from "domains/admin/entities/user";
import {User} from "domains/admin/entities/user";

import {UserFingerPrintAggregate} from "domains/aggregates/indentity/fingerprint";

import {UserData} from "data/admin/users/user";

enum Action {
    NOTE = 'note',
    SUPER_LIKE = 'superlike'
}

class ProfileAggregate {
    static shared = singleton((id: string) => new ProfileAggregate(id));

    public readonly id: IdentifierI;
    private readonly state: State<User>;

    private constructor(id: string) {
        this.id = User.id(id);
        this.state = new State<User>(this.id, this.read, 0);
    }

    private read = () => {
        return UserData.facade.read().pipe(
            switchMap(it => EntityResult.unit(
                (props) => User.factory(props.sql),
                it
            ))
        )
    }

    public create(value: UserI) {
        const { data: { firstName, lastName, birthday, gender }, ...rest } = value;

        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return UserData.facade.create({ firstName, lastName, birthday, gender }, it.value).pipe(
                    map(it => {
                        if(!it.isSuccessful) {
                            return Result.failure(it.error);
                        }

                        const { data: { id }} = it.value;

                        //TODO check id get;

                        return Result.success(id);
                    })
                )
            }),
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const id = `${it.value}`;

                return ProfileAggregate.shared(id).update(rest).pipe(
                    switchMap(it => {
                        if(!it.isSuccessful) {
                            return of(Result.failure(it.error));
                        }

                        return ProfileAggregate.shared(id).data();
                    })
                );
            })
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

    static getDefaultPreferences() {
        return new Observable<SuccessfulResult<UserDefaultPreferencesType>>((observer) => {
            observer.next(Result.success(UserPreferenceEntity.getDefaultPreference()));
            observer.complete();
        });
    }

    public data() {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }
                const item = it.value.get();

                return Result.success({
                    data: item.data.get(),
                    location: item.location.get(),
                    media: item.media.get(),
                    meta: item.meta.get(),
                });
            })
        );
    }
}

export {ProfileAggregate};