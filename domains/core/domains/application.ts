import { singleton } from "utils/singleton";
//TODO remove from domain
import {Application} from "application/main";
import { Domain } from "domains/core/domains/base";

class Domains {
    static shared = singleton(() => new Domain(Application.shared().settings.ids.domains));
}

export { Domains }