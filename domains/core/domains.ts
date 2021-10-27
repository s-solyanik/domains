import type {IdentifierI} from "utils/unique-id";
import { singleton } from "utils/singleton";

import {Application} from "application/main";

import type { Actualize } from "domains/core/state/record";
import { StateManager } from "domains/core/state/manager";

class Domains {
    static shared = singleton((domain: string) => new Domains(domain));

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

const domains = Domains.shared(Application.shared().settings.ids.domains);

export { Domains, domains };