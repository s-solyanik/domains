import type {IdentifierI} from "utils/unique-id";

import type { Actualize } from "domains/core/state/record";
import { StateManager } from "domains/core/state/manager";
import { Entity } from "domains/core/entity";

class Domain {
    private readonly domain: string;
    private readonly manager: StateManager;

    constructor(domain: string) {
        this.domain = domain;
        this.manager = StateManager.shared(this.domain);
    }

    public state<T>(id: IdentifierI, actualize: Actualize<T>) {
        if(!Entity.isEntityId(id)) {
            throw new Error(`Id is not an instance of ${Entity.name}`);
        }

        return this.manager.createStateRecord<T>(id, actualize);
    }
}

export { Domain };