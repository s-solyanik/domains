import { ValueObject } from 'domains/core/entity/value-object';
import type { DialogsMessageType } from 'domains/common/dialogs.messages/type';

class DialogsMessageValueObject extends ValueObject<DialogsMessageType> {
    static factory(message: DialogsMessageType): DialogsMessageValueObject {
        return new DialogsMessageValueObject(message);
    }
}

export { DialogsMessageValueObject };
