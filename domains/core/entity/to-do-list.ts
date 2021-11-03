import { Observable, switchMap, of } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { FAILURE_MESSAGE, Result } from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";

import type { StateRecord } from "domains/core/state/record";
import { Domains } from "domains/core/domains/application";

type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

interface TodDoItem {
    id: IdentifierI
}

interface ToDoI<T> {
    get(): Observable<ResultWrapper<{ items: T[], total: number }>>
    add(item: ResultWrapper<T>): Observable<ResultWrapper<boolean>>
    update(item: ResultWrapper<T>): Observable<ResultWrapper<boolean>>
    remove(id: ResultWrapper<IdentifierI>): Observable<ResultWrapper<boolean>>
}

class ToDoList<Item extends TodDoItem> implements ToDoI<Item> {
    private readonly ttl: number;
    private readonly state: StateRecord<ResultWrapper<{ items: Item[], total: number }>>;

    constructor(
        id: IdentifierI,
        actualize: () => Observable<ResultWrapper<{ items: Item[], total: number }>>,
        ttl= 0
    ) {
        this.ttl = ttl;
        this.state = Domains.shared().state(id, () => {
            return actualize().pipe(
                map((it) => ({
                    data: it.isSuccessful ? Result.success(it.value) : Result.failure(it.error),
                    expiration: this.ttl
                }))
            )
        });
    }

    private items() {
        return this.state.origin().pipe(
            take(1),
            map(it => {
                if(typeof it === undefined) {
                    return [] as unknown as ResultWrapper<{ items: Item[], total: number }>;
                }

                return it;
            })
        );
    }

    public get = () => {
        return this.state.data();
    }

    public add = (created: ResultWrapper<Item>) => {
        if(!created.isSuccessful) {
            return of(Result.failure(created.error));
        }

        return this.items().pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }

                this.state.update(
                    Result.success({
                        items: [created.value, ...it.value.items],
                        total: it.value.total + 1
                    }),
                    this.ttl
                );
            }),
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    public update = (updated: ResultWrapper<Item>) => {
        if(!updated.isSuccessful) {
            return of(Result.failure(updated.error));
        }

        return this.items().pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }

                this.state.update(
                    Result.success({
                        items: it.value.items.map(item => item.id.equals(updated.value.id) ? updated.value : item),
                        total: it.value.total
                    }),
                    this.ttl
                );
            }),
            switchMap(EntityResult.errorOrSuccess)
        );
    }

    public remove = (deleted: ResultWrapper<IdentifierI>) => {
        if(!deleted.isSuccessful) {
            return of(Result.failure(deleted.error));
        }

        return this.items().pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }

                this.state.update(
                    Result.success({
                        items: it.value.items.filter(item => !item.id.equals(deleted.value)),
                        total: it.value.total - 1
                    }),
                    this.ttl
                );
            }),
            switchMap(EntityResult.errorOrSuccess)
        );
    }
}

export { ToDoList };