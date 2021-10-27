import type {IdentifierI} from "utils/unique-id";
import { singleton } from "utils/singleton";

//TODO remove from domain
import {Application} from "application/main";

import type { Actualize } from "domains/core/state/record";
import { StateManager } from "domains/core/state/manager";

class Entry {
    static shared = singleton((domain: string) => new Entry(domain));

    private readonly domain: string;

    private readonly stateManager: StateManager;

    private constructor(domain: string) {
        this.domain = domain;
        this.stateManager = StateManager.shared(this.domain);
    }

    public entity<T>(id: IdentifierI, actualize: Actualize<T>) {
        return this.stateManager.createStateRecord<T>(id, actualize);
    }
}

const domainsEntry = Entry.shared(Application.shared().settings.ids.domains);

export { Entry, domainsEntry };