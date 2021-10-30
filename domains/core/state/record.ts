import {defer, Observable, switchMap, zip, EMPTY, of, catchError} from "rxjs";
import {take, map, tap, distinctUntilChanged} from "rxjs/operators";
//import equal from 'fast-deep-equal';

import {IdentifierI} from "utils/unique-id";

import type {StorageI, Record} from "domains/core/storage";

export type Actualize<T> = () => Observable<Record<T>>;

enum STATUS {
    INIT = 'init',
    PENDING = 'pending',
    SUCCESS = 'success'
}

class StateRecord<T> {
    public readonly id: IdentifierI;
    private readonly state: Observable<T>;
    private readonly storage: StorageI;
    private status: STATUS = STATUS.INIT;

    constructor(id: IdentifierI, actualize: Actualize<T>, storage: StorageI) {
        this.id = id;
        this.storage = storage;
        this.state = defer(() => {
            this.storage.subject<T>(this.id.toString()).pipe(
                take(1),
                switchMap((it) => {
                    const isEmpty = it?.data === undefined;

                    if(isEmpty && !this.isStatus(STATUS.PENDING)) {
                        return of(true);
                    }

                    return this.isExpired(it).pipe(
                        map(isExpired => isExpired)
                    );
                }),
                switchMap((isExpired) => {
                    if(!isExpired) {
                        return EMPTY;
                    }

                    this.changeStatus(STATUS.PENDING);

                    return zip(actualize(), this.getDate()).pipe(
                        catchError(() => EMPTY),
                    );
                }),
            ).subscribe(([{ data, expiration }, now]) => {
                this.storage.update<T>(this.id, {
                    data: data,
                    expiration: expiration + now
                })
            });

            return this.storage.read<T>(this.id);
        }).pipe(
            map((it: Record<T>) => it.data)
            //distinctUntilChanged(equal)
        );
    }

    private changeStatus(status: STATUS) {
        this.status = status;
    }

    private isStatus(status: STATUS) {
        return this.status === status;
    }

    private getDate = (): Observable<number> => {
        return new Observable<number>(it => {
            it.next(Date.now());
            it.complete();
        });
    };

    private isExpired(record: Record<T>) {
        return new Observable<boolean>((it) => {
            it.next(record?.data !== undefined && record?.expiration <= Date.now());
            it.complete();
        });
    };

    public data(): Observable<T> {
        return this.state;
    }

    public update(value: T, ttl: number) {
        this.storage.update(this.id, {
            data: value,
            expiration: ttl
        });
    }
}

export { StateRecord };
