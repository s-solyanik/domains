import {of, EMPTY} from "rxjs";
import {switchMap, map, take} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {Result} from "utils/result/dto";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserSubscriptionType} from "domains/entities/users.subscription";
import {UserSubscriptionEntity, SUBSCRIPTION_STATE} from "domains/entities/users.subscription";

import {UserFingerPrintAggregate} from "domains/aggregates/indentity/fingerprint";

import {SubscriptionsData} from "data/web-app/users/subscription";

class UserSubscriptionAggregate {
    static shared = singleton((id: string) => new UserSubscriptionAggregate(id));

    public readonly id: IdentifierI;
    private readonly todo: ToDoList<UserSubscriptionEntity>;

    private constructor(id: string) {
        this.id = UserSubscriptionEntity.id(`owner.${id}`);
        this.todo = new ToDoList<UserSubscriptionEntity>(this.id, this.read, 0);
    }

    private read = () => {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap(it => {
                return SubscriptionsData.facade.read(it.value).pipe(
                    switchMap(it => EntityResult.array(UserSubscriptionEntity.factory, it)),
                )
            })
        )
    }

    public active() {
        return this.todo.items().pipe(
            take(1),
            switchMap(it => {
                const active = it.value.items.find(item => {
                    return item.get().state === SUBSCRIPTION_STATE.ONGOING || item.get().state ===  SUBSCRIPTION_STATE.UNCLAIMED;
                });

                if(active) {
                    return of(Result.success(active));
                }

                return EMPTY;
            })
        )
    }

    public delete(id: number) {
        return UserFingerPrintAggregate.shared().data().pipe(
            switchMap((it) => SubscriptionsData.facade.delete({ ...it.value, subscriptionId: id })),
            map((it) => {
                if(it.isSuccessful) {
                    return Result.success(UserSubscriptionEntity.id(`${id}`));
                }

                return Result.failure({
                    status: 0,
                    message: 'Subscription could not be canceled. Please contact support.'
                });
            }),
            switchMap(this.todo.remove)
        );
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserSubscriptionEntity, UserSubscriptionType>(it))
        );
    }
}

export type {UserSubscriptionType};
export {UserSubscriptionAggregate};