import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { I18nType } from 'domains/entities/i18n/type';
import { I18nValueObject } from 'domains/entities/i18n/value-object';

interface I18nProps {
    readonly id: IdentifierI
    readonly value: I18nValueObject
}

class I18nEntity extends Entity<I18nProps> {
    public get() {
        return this;
    }

    public text(resource: URL) {
        const { host, pathname, hash } = resource;

        if (!hash) {
            throw new Error('Incorrect i18n object key');
        }

        const texts = this.props.value.get();
        const name = `${host || ''}${pathname || ''}`;

        return texts && texts[name] ? texts[name][hash.slice(1)] : undefined;
    }

    static id() {
        return I18nEntity.createId('i18n');
    }

    static factory(props: I18nType) {
        return new I18nEntity({
            id: I18nEntity.id(),
            value: I18nValueObject.factory(props)
        });
    }
}

export { I18nEntity };
