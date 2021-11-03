import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityArrayI } from "domains/core/entity/array-with-state";
import { EntityArrayWithState } from "domains/core/entity/array-with-state";

import type { DialogsMessageType } from "domains/entities/dialogs.messages";
import { DialogsMessageEntity } from "domains/entities/dialogs.messages";

import { MessagesData } from "data/messages";

type FiltersProps = {
    page: number
    pagesize: number
    orderBy: string
}

class DialogsMessagesAggregate implements EntityArrayI<DialogsMessageEntity, DialogsMessageType> {
    static shared = singleton((sender: number, recipient: number, filters: FiltersProps) => {
        return new EntityArrayWithState<DialogsMessageEntity, DialogsMessageType>(
            new DialogsMessagesAggregate(sender, recipient, filters)
        )
    })

    private readonly filters: FiltersProps;
    private readonly sender: number;
    private readonly recipient: number;

    public readonly id: IdentifierI;
    public readonly ttl = 1000;

    constructor(sender: number, recipient: number, filters: FiltersProps) {
        this.sender = sender;
        this.recipient = recipient;
        this.filters = filters;
        this.id = DialogsMessageEntity.id('all', 'list');
    }

    public unitId(id: number) {
        return DialogsMessageEntity.id(this.sender, this.recipient);
    }

    public read = () => {
        return MessagesData.facade.read(this.sender, this.recipient, this.filters).pipe(
            switchMap(it => EntityResult.createArray(
                (props: DialogsMessageType) => DialogsMessageEntity.factory(this.sender, this.recipient, props),
                it
            ))
        )
    }
}

export type { DialogsMessageType, FiltersProps };
export { DialogsMessagesAggregate };