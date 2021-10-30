import {defer, Observable} from "rxjs";
import {take, map} from "rxjs/operators";

import {IdentifierI} from "utils/unique-id";

import type {StorageI, Record} from "domains/core/storage";

export type Actualize<T> = () => Observable<Record<T>>;

class StateRecord<T> {
    public readonly id: IdentifierI;
    private readonly state:  Observable<Record<T>>;
    private readonly storage: StorageI;

    constructor(id: IdentifierI, actualize: Actualize<T>, storage: StorageI) {
        this.id = id;
        this.storage = storage;
        this.state = defer(() => {
            actualize().pipe(take(1)).subscribe(it => {
                this.storage.update<T>(this.id, it)
            });

            return this.storage.read<T>(this.id)
        });
    }

    private getDate = (): Observable<number> => {
        return new Observable(it => {
            it.next(Date.now());
            it.complete();
        });
    };

    private isExpired = (): Observable<boolean> => {
        return this.storage.read(this.id).pipe(
            take(1),
            map(it => {
                return it?.data !== undefined && it?.expiration <= Date.now()
            })
        )
    };

    public data(): Observable<Record<T>> {
        return this.state;
    }

    public update(value: Record<T>) {
        this.storage.update(this.id, value);
    }
}

export { StateRecord };
