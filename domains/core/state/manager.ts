import {IdentifierI, UID} from "utils/unique-id";
import {singleton} from "utils/singleton";

import type { StorageI } from "domains/core/storage";
import { Storage } from "domains/core/storage";

import type { Actualize } from "domains/core/state/record";
import { StateRecord } from "domains/core/state/record";

class StateManager {
    static readonly shared = singleton((domain: string) => new StateManager(domain));

    public readonly id: IdentifierI;
    private readonly storage: StorageI;

    private constructor(domain: string) {
        this.id = UID.factory(StateManager.name, `${domain}.state`);
        this.storage = Storage.shared(domain);
    }

    public createStateRecord<T>(id: IdentifierI, actualize: Actualize<T>) {
        return new StateRecord<T>(id, actualize, this.storage);
    }
}

export { StateManager };