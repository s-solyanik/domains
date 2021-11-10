import {Subscription, EMPTY, of} from "rxjs";
import { switchMap, tap, map } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";
import {Result} from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import { State } from "domains/core/state";

import type { FingerprintType } from "domains/entities/users.fingerprint";
import { UserFingerprintEntity } from "domains/entities/users.fingerprint";

import {IdentityPhoneAggregate} from "domains/aggregates/indentity/phone";

import { FingerprintData } from "data/common/identity/fingerprint";

class UserFingerPrintAggregate {
    static shared = singleton(() => new UserFingerPrintAggregate());
    private subscription: Subscription|null = null;

    public readonly id: IdentifierI;
    private readonly state: State<UserFingerprintEntity>;

    private constructor() {
        this.id = UserFingerprintEntity.id('owner');
        this.state = new State<UserFingerprintEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return FingerprintData.facade.read().pipe(
            switchMap(it => EntityResult.unit(UserFingerprintEntity.factory, it))
        )
    }

    private waitIdentity() {
        return IdentityPhoneAggregate.shared().data().subscribe(it => {
            if(!it.isSuccessful) {
                return;
            }

            const fingerprint: FingerprintType = {
                user: it.value.identifier,
                guid: it.value.guid,
                client: 'web_01'
            };

            this.state.update(Result.success(UserFingerprintEntity.factory(fingerprint)));
        });
    }

    public isAuth() {
        return this.state.origin().pipe(
            map(it => Result.success(it.isSuccessful))
        );
    }

    public data() {
        return this.state.data().pipe(
            tap(it => {
                if(it.isSuccessful) {
                    this.subscription?.unsubscribe();
                } else {
                    this.subscription = this.waitIdentity();
                }
            }),
            switchMap(it => EntityResult.unitGet<UserFingerprintEntity, FingerprintType>(it)),
            switchMap(it => {
                if(!it.isSuccessful) {
                    return EMPTY;
                }

                return of(Result.success(it.value));
            })
        );
    }
}

export type { FingerprintType };
export { UserFingerPrintAggregate };