import type {IdentifierI} from "utils/unique-id";
import { singleton } from "utils/singleton";

//TODO remove from domain
import {Application} from "application/main";

import type { Actualize } from "domains/core/state/record";
import { StateManager } from "domains/core/state/manager";
import { Entity } from "domains/core/entity";

class Singleton {
    static shared = singleton((domain: string) => new Singleton(domain));

    private readonly domain: string;
    private readonly stateManager: StateManager;

    private constructor(domain: string) {
        this.domain = domain;
        this.stateManager = StateManager.shared(this.domain);
    }

    public entity<T>(id: IdentifierI, actualize: Actualize<T>) {
        if(!Entity.isEntityId(id)) {
            throw new Error(`Id is not an instance of ${Entity.name}`);
        }

        return this.stateManager.createStateRecord<T>(id, actualize);
    }
}

const domainsEntry = Singleton.shared(Application.shared().settings.ids.domains);

export { Singleton, domainsEntry };