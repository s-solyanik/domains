import type { IdentifierI } from 'utils/unique-id';
import { UID } from 'utils/unique-id';

type RULE = {
    message: string
    or?: string
    required?: boolean
    type?: string
    oneOf?: string[]|number[]
    isValidCustom?: (props: any) => boolean
    range?: {
        from: number
        to: number
    }
};

type RULES = {
    [key: string]: RULE
}

type Props = {
    [key: string]: any
}

type DependencyCallback = (props: Props, rule: RULE, name: string) => void;

type Dependency = {
    iterator: (callback: DependencyCallback) => void
}

class ErrorMessage {
    readonly id: IdentifierI;
    readonly name: string;
    readonly message: string;

    private constructor(name: string, message: string) {
        this.id = UID.factory('ErrorId', name);
        this.name = name;
        this.message = message;
    }

    public equals(object?: ErrorMessage): boolean {

        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!ErrorMessage.isError(object)) {
            return false;
        }

        return this.id.equals(object.id);
    }

    static isError(v: any): v is ErrorMessage {
        return v instanceof ErrorMessage;
    }

    static factory(name: string, message: string) {
        return new ErrorMessage(name, message);
    }
}

class Validation {
    readonly rules: RULES;

    private constructor(rules: RULES) {
        this.rules = rules;
    }

    public validate(props: Props) {
        return Validation.compose({
            iterator: Validation.composeIteratorFromRulesObject(props, this.rules)
        });
    }

    private static compose(dependencies: Dependency) {
        const { iterator } = dependencies;
        const errors: ErrorMessage[]  = [];

        iterator((current, rule, name) => {
            if (!Validation.isValid(current, rule, name)) {
                errors.push(ErrorMessage.factory(name, rule.message));
            }
        });

        return errors;
    }

    private static composeIteratorFromRulesObject(current: Props, rules: RULES) {
        return function (cb: DependencyCallback) {
            Object.keys(rules).forEach(function (name) {
                cb(current, rules[name], name);
            });
        };
    }

    private static isValid(props: Props, rule: RULE, name: string) {
        const { required, oneOf, range, type, or, isValidCustom } = rule;
        const current = props[name];

        switch (true) {
            case required && !current: return false;
            case or && !current && !props[or]: return false;
            case isValidCustom && !isValidCustom(current): return false;
            case !Validation.isOneOf(current, oneOf): return false;
            case !Validation.isTypeOf(current, type): return false;
            case !Validation.isInRange(current, range): return false;
            default: return true;
        }
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    private static isInRange(value: any, range?: { from: number; to: number }) {
        return !range || (range && range.from <= value && value <= range.to);
    }

    private static isOneOf(value: any, oneOf?: string[]|number[]) {
        return !oneOf || (oneOf && oneOf.some((one: any) => one === value));
    }

    private static isTypeOf(value: any, type?: string) {
        return !type || (type && Object.prototype.toString.call(value) === `[object ${type}]`);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    static factory(rules: RULES) {
        return new Validation(rules);
    }
}

export { Validation };
