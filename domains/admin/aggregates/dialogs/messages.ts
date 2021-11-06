import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import { ToDoList } from "domains/core/to-do-list";

import type { DialogsMessageType } from "domains/entities/dialogs.messages";
import { DialogsMessageEntity } from "domains/entities/dialogs.messages";

import { MessagesData } from "data/dialogs/messages";

type FiltersProps = {
    page: number
    pagesize: number
    orderBy: string
}

class DialogsMessagesAggregate  {
    static shared = singleton((sender: number, recipient: number, filters: FiltersProps) => {
        return new DialogsMessagesAggregate(sender, recipient, filters);
    })

    public readonly id: IdentifierI;

    private readonly filters: FiltersProps;
    private readonly sender: number;
    private readonly recipient: number;
    private readonly todo: ToDoList<DialogsMessageEntity>;

    private constructor(sender: number, recipient: number, filters: FiltersProps) {
        this.sender = sender;
        this.recipient = recipient;
        this.filters = filters;
        this.id = DialogsMessageEntity.id('all', 'list');
        this.todo = new ToDoList<DialogsMessageEntity>(this.id, this.read, 1000);
    }

    private read = () => {
        return MessagesData.facade.read(this.sender, this.recipient, this.filters).pipe(
            switchMap(it => EntityResult.array(
                (props) => DialogsMessageEntity.factory(this.sender, this.recipient, props),
                it
            ))
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<DialogsMessageEntity, DialogsMessageType>(it))
        );
    }
}

export type { DialogsMessageType, FiltersProps };
export { DialogsMessagesAggregate };