import {IdentifierI, UID} from "utils/unique-id";
import {singleton} from "utils/singleton";
import type {LoggerI} from "utils/logger";
import {LOG_LEVELS, Logger} from "utils/logger";

const PRODUCT = 'web-app';
const loggerId = `application.logger.${PRODUCT}`;

class Application {
    static shared = singleton(() => {
        return new Application(
            Logger.shared(UID.factory('ApplicationLoggerId', loggerId), LOG_LEVELS.DEBUG)
        )
    });

    public readonly id = UID.factory('Application', `application.${PRODUCT}`);
    public readonly logger: LoggerI;

    private readonly _settings: {
        ids: {
            logger: string
            domains: string
        }
    };

    private constructor(logger: LoggerI) {
        this.logger = logger;

        this._settings = {
            ids: {
                logger: loggerId,
                domains: `domains.${PRODUCT}`,
            }
        }
    }

    public get settings() {
        return this._settings
    }
}

export { Application };