import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Moderation } from 'domains/entities/users.moderation.image/type';
import { Action, Reason } from 'domains/entities/users.moderation.image/type';
import { UserModerationImageValueObject } from 'domains/entities/users.moderation.image/value-object';

interface UsersModerationProps {
    readonly id: IdentifierI
    readonly value: UserModerationImageValueObject
}

class ModerationEntity extends Entity<UsersModerationProps> {
    public get() {
        return this.props.value.get();
    }

    public approve() {
        return ModerationEntity.factory({
            ...this.get(),
            action: Action.APPROVE
        });
    }

    public decline() {
        return ModerationEntity.factory({
            ...this.get(),
            action: Action.DECLINE
        });
    }

    public setReason(reason: Reason) {
        return ModerationEntity.factory({
            ...this.get(),
            reason
        });
    }

    static id(id: string) {
        return ModerationEntity.createId(`moderation.${id}`);
    }

    static factory(props: Moderation) {
        return new ModerationEntity({
            id: ModerationEntity.id(props.identifier),
            value: UserModerationImageValueObject.factory(props)
        });
    }
}

export { ModerationEntity };
