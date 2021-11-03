import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Media } from 'domains/entities/media/type';
import { MediaValueObject } from 'domains/entities/media/value-object';

interface MediaProps {
    readonly id: IdentifierI
    readonly value: MediaValueObject
}

class MediaEntity extends Entity<MediaProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return MediaEntity.createId(`media.${id}`);
    }

    static factory(id: string, props: Media) {
        return new MediaEntity({
            id: MediaEntity.id(id),
            value: MediaValueObject.factory(props)
        });
    }
}

export { MediaEntity };
