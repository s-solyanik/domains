import {of} from 'rxjs';
import {switchMap, tap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {IdentityPhoneType} from "domains/entities/identity.common";
import {IdentityPhoneEntity} from "domains/entities/identity.common";

import {IdentityPhoneData} from "data/common/identity/phone";

class IdentityPhoneAggregate {
    static shared = singleton(() => new IdentityPhoneAggregate());

    public readonly id: IdentifierI;
    private confirmation?: any;
    private readonly state: State<IdentityPhoneEntity>;

    private constructor() {
        this.id = IdentityPhoneEntity.id();
        this.state = new State<IdentityPhoneEntity>(this.id, this.read, 0);
    }

    private read = () => {
        return IdentityPhoneData.facade.read().pipe(
            switchMap(it => EntityResult.unit(IdentityPhoneEntity.factory, it))
        )
    }

    public create(id: string, phone: string) {
        return IdentityPhoneData.facade.create(id, phone).pipe(
            switchMap(it => EntityResult.unit(IdentityPhoneEntity.factory, it)),
            tap(it => {
                if(it.isSuccessful) {
                    this.confirmation = it.value;
                }
            }),
            switchMap(this.state.update)
        )
    }

    public update(code: string) {
        return IdentityPhoneData.facade.update(code, this.confirmation).pipe(
            switchMap(it => EntityResult.unit(IdentityPhoneEntity.factory, it)),
            switchMap(this.state.update)
        )
    }

    public user() {
        return IdentityPhoneData.facade.user();
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<IdentityPhoneEntity, IdentityPhoneType>(it)),
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const identity = it.value;

                return IdentityPhoneData.facade.store(identity).pipe(
                    map(() => Result.success(identity))
                )
            })
        );
    }
}

export type {IdentityPhoneType};
export {IdentityPhoneAggregate};