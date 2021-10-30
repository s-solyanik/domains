import {BehaviorSubject, Observable, EMPTY, of, zip } from 'rxjs';
import { switchMap, take } from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {UID} from "utils/unique-id";

export type Record<T> = {
    data: T
    expiration: number
}

export interface StorageI {
    id: IdentifierI
    read<T>(id: IdentifierI): Observable<Record<T>>
    update<T>(id: IdentifierI, value: Record<T>): void
    remove(id: IdentifierI): void
    clear(): void
    keys(): Observable<string[]>
    values<T>(): Observable<Record<T>[]>
    size(): Observable<number>
}

class Storage implements StorageI {
    static readonly idName = 'EntityId';
    static readonly shared = singleton((domain: string) => new Storage(domain));

    public readonly id: IdentifierI;
    private readonly storage = new Map<string, BehaviorSubject<Record<any>|undefined>>();

    private constructor(domain: string) {
        this.id = UID.factory(Storage.idName, `${domain}.storage`);
    }

    private subject<T>(id: string) {
        if(!this.storage.get(id)) {
            this.storage.set(id, new BehaviorSubject<Record<T>>(undefined))
        }

        return this.storage.get(id) as BehaviorSubject<Record<T>>;
    }

    public read<T>(id: IdentifierI): Observable<Record<T>> {
        return this.subject<T>(id.toString()).pipe(
            switchMap(it => {
                if (it === undefined) {
                    return EMPTY;
                }

                return of(it);
            })
        )
    }

    public update<T>(id: IdentifierI, value: Record<T>) {
        this.subject<T>(id.toString()).next(value);
    }

    public remove(id: IdentifierI) {
        this.subject<undefined>(id.toString()).next(undefined);
        this.storage.delete(id.toString());
    }

    public clear() {
        this.storage.forEach((value, id) => {
            this.subject<undefined>(id).next(undefined);
        });
        this.storage.clear();
    }

    public keys() {
        return new Observable<string[]>((observer) => {
            observer.next([...this.storage.keys()]);
            observer.complete();
        });
    }

    public values() {
        return new Observable<Record<any>[]>((observer) => {
            zip([...this.storage.values()]).pipe(
                take(1)
            ).subscribe(it => {
                observer.next(it?.filter(record => record.data));
                observer.complete();
            });
        });
    }

    public size() {
        return new Observable<number>((observer) => {
            observer.next(this.storage.size);
            observer.complete();
        });
    }
}

export { Storage };