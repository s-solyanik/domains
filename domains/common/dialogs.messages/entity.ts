import type { IdentifierI } from 'utils/unique-id';
import { UID } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { DialogsMessageType } from 'domains/common/dialogs.messages/type';
import { DialogsMessageValueObject } from 'domains/common/dialogs.messages/value-object';

interface DialogsMessageProps {
    readonly id: IdentifierI
    readonly value: DialogsMessageValueObject
}

class DialogsMessageEntity extends Entity<DialogsMessageProps> {
    public get() {
        return this.props.value.get();
    }

    static id(sender: number, recipient: number) {
        return DialogsMessageEntity.createId(`dialogs.messages.${sender}.${recipient}`);
    }

    static factory(sender: number, recipient: number, props: DialogsMessageType) {
        return new DialogsMessageEntity({
            id: DialogsMessageEntity.id(sender, recipient),
            value: DialogsMessageValueObject.factory(props)
        });
    }
}

export { DialogsMessageEntity };
