import { ValueObject } from 'domains/core/entity/value-object';
import type { Impression } from 'domains/common/users.impressions/type';

class ImpressionValueObject extends ValueObject<Impression> {
    static factory(impression: Impression): ImpressionValueObject {
        return new ImpressionValueObject(impression);
    }
}

export { ImpressionValueObject };
