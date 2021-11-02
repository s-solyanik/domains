import { ValueObject } from 'domains/core/entity/value-object';
import type { I18nType } from 'domains/common/i18n/type';

class I18nValueObject extends ValueObject<I18nType> {
    static factory(user: I18nType): I18nValueObject {
        return new I18nValueObject(user);
    }
}

export { I18nValueObject };
