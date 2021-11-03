import { ValueObject } from 'domains/core/entity/value-object';
import type { Media } from 'domains/entities/media/type';

class MediaValueObject extends ValueObject<Media> {
    static factory(preference: Media): MediaValueObject {
        return new MediaValueObject(preference);
    }
}

export { MediaValueObject };
