import * as log from 'loglevel';

import {IdentifierI} from "./unique-id";
import { singleton } from './singleton';

export interface LoggerI {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    info(...args: any[]): void
    warm(...args: any[]): void
    error(...args: any[]): void
    debug(...args: any[]): void
    trace(...args: any[]): void
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export enum LOG_LEVELS {
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARM = 'warn',
    ERROR = 'error'
}

class Logger implements LoggerI {
    static shared = singleton((id: IdentifierI, level?: LOG_LEVELS) => {
        return new Logger(id, level);
    })
    private log: log.Logger;
    private readonly id: IdentifierI;

    constructor(id: IdentifierI, level?: LOG_LEVELS) {
        this.id = id;
        this.log = log.noConflict();
        this.log.setLevel(level || LOG_LEVELS.ERROR);
    }

    private static getColor(level: LOG_LEVELS) {
        switch (true) {
            case level === LOG_LEVELS.INFO: return '#00ff42';
            case level === LOG_LEVELS.ERROR: return '#ef0202';
            case level === LOG_LEVELS.WARM: return '#f18c10';
            case level === LOG_LEVELS.TRACE: return '#f90ebc';
            case level === LOG_LEVELS.DEBUG: return '#0ef9e3';
            default: return '#953131';
        }
    }

    private composeOutPut(level: LOG_LEVELS, message: string) {
        return [
            `%c [ID ${this.id}] %c [${(new Date()).toISOString()}] %c [${level.toUpperCase()}]: %c ${message}`,
            'color: #106ba3',
            'color: #ffff00',
            `color: ${Logger.getColor(level)}`,
            'color: #ffffff'
        ];
    }

    public info(message: string, ...args: any[]): void {
        this.log?.info(...this.composeOutPut(LOG_LEVELS.INFO, message), ...args);
    }

    public warm(message: string, ...args: any[]): void {
        this.log?.warn(...this.composeOutPut(LOG_LEVELS.WARM, message), ...args);
    }

    public error(message: string, ...args: any[]): void {
        this.log?.error(...this.composeOutPut(LOG_LEVELS.ERROR, message), ...args);
    }

    public debug(message: string, ...args: any[]): void {
        this.log?.debug(...this.composeOutPut(LOG_LEVELS.DEBUG, message), ...args);
    }

    public trace(message: string, ...args: any[]): void {
        this.log?.trace(...this.composeOutPut(LOG_LEVELS.TRACE, message), ...args);
    }
}

export { Logger };
