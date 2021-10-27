import {BehaviorSubject, Observable, EMPTY, of, zip } from 'rxjs';
import { switchMap, take } from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {UID} from "utils/unique-id";

export interface StorageI {
    id: IdentifierI
    read<T>(id: IdentifierI): Observable<T>
    update<T>(id: IdentifierI, value: T): void
    remove(id: IdentifierI): void
    clear(): void
    keys(): Observable<string[]>
    values<T>(): Observable<T[]>
    size(): Observable<number>
}

class Storage implements StorageI {
    static readonly idName = 'EntityId';
    static readonly shared = singleton((domain: string) => new Storage(domain));

    public readonly id: IdentifierI;
    private readonly storage = new Map<string, BehaviorSubject<any|undefined>>();

    private constructor(domain: string) {
        this.id = UID.factory(Storage.idName, `${domain}.storage`);
    }

    private subject<T>(id: string) {
        if(!this.storage.get(id)) {
            this.storage.set(id, new BehaviorSubject<T>(undefined))
        }

        return this.storage.get(id) as BehaviorSubject<T>;
    }

    public read<T>(id: IdentifierI): Observable<T> {
        return this.subject<T>(id.toString()).pipe(
            switchMap(it => {
                if (it === undefined) {
                    return EMPTY;
                }

                return of(it);
            })
        )
    }

    public update<T>(id: IdentifierI, value: T) {
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
        return new Observable<any[]>((observer) => {
            zip([...this.storage.values()]).pipe(
                take(1)
            ).subscribe(it => {
                observer.next(it?.filter(value => value));
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