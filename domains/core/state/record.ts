import {defer, Observable} from "rxjs";
import {take} from "rxjs/operators";

import {IdentifierI} from "utils/unique-id";

import type {StorageI} from "domains/core/storage";

export type Actualize<T> = () => Observable<T>;

class StateRecord<T> {
    public readonly id: IdentifierI;
    private readonly state:  Observable<T>;
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

    public data(): Observable<T> {
        return this.state;
    }

    public update(value: T) {
        this.storage.update(this.id, value);
    }
}

export { StateRecord };
