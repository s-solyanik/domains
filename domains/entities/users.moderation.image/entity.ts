import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { ModerationImageType } from 'domains/entities/users.moderation.image/type';
import { Action, Reason } from 'domains/entities/users.moderation.image/type';
import { UserModerationImageImageValueObject } from 'domains/entities/users.moderation.image/value-object';

interface UsersModerationImageProps {
    readonly id: IdentifierI
    readonly value: UserModerationImageImageValueObject
}

class ModerationImageEntity extends Entity<UsersModerationImageProps> {
    public get() {
        return this.props.value.get();
    }

    public approve() {
        return ModerationImageEntity.factory({
            ...this.get(),
            note: null,
            action: Action.APPROVE,
            reason: null
        });
    }

    public decline() {
        return ModerationImageEntity.factory({
            ...this.get(),
            action: Action.DECLINE
        });
    }

    public setReason(reason: Reason) {
        return ModerationImageEntity.factory({
            ...this.get(),
            reason
        });
    }

    static id(id: string) {
        return ModerationImageEntity.createId(`users.moderation.images.${id}`);
    }

    static factory(props: ModerationImageType) {
        return new ModerationImageEntity({
            id: ModerationImageEntity.id(props.identifier),
            value: UserModerationImageImageValueObject.factory(props)
        });
    }
}

export { ModerationImageEntity };
