import {of} from "rxjs";
import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";
import {Result} from "utils/result/dto";

import {UserPreferenceEntity} from "domains/entities/users.preference";
import type { UserDataType } from "domains/entities/users.data";
import type { UserLocationType } from "domains/entities/users.location";
import type { UserMediaType } from "domains/entities/users.media";
import type { UserMetaType } from "domains/entities/users.meta";
import type {UserPreferenceType} from "domains/entities/users.preference";
import type {UserBonusesType} from "domains/entities/users.bonuses";

import type {UserI} from "domains/web-app/entities/user";
import {User} from "domains/web-app/entities/user";

import {UserFingerPrintAggregate} from "domains/aggregates/indentity/fingerprint";

import {UsersProfileData} from "data/web-app/users/profile";
import {MediaData} from "data/web-app/media/thumbnail";

type UserAggregateToUpdate = UserDataType
    & UserLocationType
    & UserMediaType
    & UserMetaType
    & UserPreferenceType
    & UserBonusesType


class Aggregate {
    static shared = singleton(() => new Aggregate());

    public readonly id: IdentifierI;
    private readonly state: State<User>;

    private constructor() {
        this.id = User.id('owner');
        this.state = new State<User>(this.id, this.read, 20000);
    }

    private read = () => {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return UsersProfileData.facade.read(it.value).pipe(
                    switchMap(it => EntityResult.unit(User.factory, it))
                )
            })
        )
    }

    public update(value: Partial<UserAggregateToUpdate>) {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return UsersProfileData.facade.read({ ...value, ...it.value }).pipe(
                    switchMap(it => EntityResult.unit(User.factory, it))
                )
            }),
            map(this.state.update)
        )
    }

    public uploadThumbnail(file: File) {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                const fingerprint = it.value;
                const type = file.type.split('/')[1] as 'jpeg';

                return MediaData.facade.read(type, fingerprint).pipe(
                    switchMap(it => {
                        if(!it.isSuccessful) {
                            return of(Result.failure(it.error));
                        }

                        const cdnResponse = it.value;

                        return MediaData.facade.create(it.value.uploadUrl, file).pipe(
                            map(it => {
                                if(!it.isSuccessful) {
                                    return Result.failure(it.error);
                                }

                                return Result.success(cdnResponse);
                            })
                        );
                    }),
                    switchMap((it) => {
                        if(!it.isSuccessful) {
                            return of(Result.failure(it.error));
                        }

                        return MediaData.facade.update(file, it.value, fingerprint);
                    }),
                    switchMap((it) => {
                        if(!it.isSuccessful) {
                            return of(Result.failure(it.error));
                        }

                        return this.update({
                            imageIdentifiers: [it.value.identifier]
                        });
                    })
                );
            })
        );
    }

    public hasMandatoryValues() {
        return this.state.origin().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(
                    it.value.get().data.hasMandatory()
                    && it.value.get().media.hasMandatory()
                    && it.value.get().meta.hasMandatory()
                );
            })
        );
    }

    public data() {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success({
                    data: it.value.get().data.get(),
                    location: it.value.get().location.get(),
                    media: it.value.get().media.get(),
                    meta: it.value.get().meta.get(),
                    bonuses: it.value.get().bonuses.get(),
                    preference: it.value.get().preference.get(),
                    defaultPreferences: UserPreferenceEntity.getDefaultPreference()
                })
            })
        );
    }
}

export {Aggregate};