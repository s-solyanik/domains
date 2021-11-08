import {Subscription, of, interval, EMPTY} from "rxjs";
import {switchMap, tap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {IdentityType} from "domains/entities/identity.email";
import {IdentityEntity} from "domains/entities/identity.email";

import {IdentityEmailData} from "data/admin/identity/email";

const MS = 1000;

class IdentityAggregate {
    static shared = singleton((email: string) => new IdentityAggregate(email));

    public readonly id: IdentifierI;
    private readonly state: State<IdentityEntity>;
    private subscription: Subscription|null = null;

    private constructor(email: string) {
        this.id = IdentityEntity.id();
        this.state = new State<IdentityEntity>(this.id, () => this.read(email), 0);
    }

    private read = (email: string) => {
        return IdentityEmailData.facade.read().pipe(
            switchMap(it => EntityResult.unit(
                ({ refresh, access}) => IdentityEntity.factory(access, refresh, email),
                it
            ))
        )
    }

    private runRefreshToken(identity: IdentityEntity) {
        return interval(MS).pipe(
            switchMap(() => {
                if(identity.isValidAccessToken()) {
                    return EMPTY;
                }

                const refresh = identity.get().tokens.refresh.value;

                return IdentityEmailData.facade.refresh(refresh);
            }),
            map(it => {
                const { expiredAt, now } = identity.expirationMessage();

                const expirationError = Result.failure({
                    status: 403,
                    message: `${expiredAt} ${now}`
                });

                if(!it.isSuccessful) {
                    return expirationError;
                }

                const { access } = it.value;
                const { tokens: { refresh }, email } = identity.get();
                const updatedIdentity = IdentityEntity.factory(access, refresh.value, email);

                //sometimes BE sends expired token in refresh response
                if(!updatedIdentity.isValidAccessToken()) {
                    return expirationError;
                }

                return Result.success(updatedIdentity);
            }),
            switchMap(it => {
                if(!it.isSuccessful) {
                    return this.delete().pipe(map(() => it));
                }

                return IdentityEmailData.facade.store(it.value.get()).pipe(
                    map(() => it)
                );
            })
        );
    }

    public create(value: { email: string, password: string, client: 'web_101' }) {
        return IdentityEmailData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(
                ({ access, refresh }) => IdentityEntity.factory(access, refresh, value.email),
                it
            )),
            switchMap((it: Result<IdentityEntity, FAILURE_MESSAGE>) => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const identity = it.value;

                return IdentityEmailData.facade.store(identity.get()).pipe(
                    map(it => {
                        if(!it.isSuccessful) {
                            return Result.failure(it.error);
                        }

                        return Result.success(identity);
                    })
                )
            }),
            switchMap(this.state.update)
        )
    }

    public update(value: Partial<IdentityType>) {
        return IdentityEmailData.facade.update(value).pipe(
            switchMap(EntityResult.errorOrSuccess)
        )
    }

    public delete() {
        return IdentityEmailData.facade.delete().pipe(
            tap(() => {
                this.subscription?.unsubscribe();
                this.subscription = null;
            }),
            switchMap(this.state.delete)
        )
    }

    public data() {
        return this.state.data().pipe(
            tap((it) => {
                if(!it.isSuccessful || this.subscription) {
                    return;
                }

                this.subscription = this.runRefreshToken(it.value).subscribe(it => {
                    this.subscription?.unsubscribe();
                    this.subscription = null;
                    this.state.update(it);
                });
            }),
            switchMap(it => EntityResult.unitGet<IdentityEntity, IdentityType>(it))
        );
    }
}

export type {IdentityType};
export {IdentityAggregate};