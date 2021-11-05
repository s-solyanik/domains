import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/entity/to-do-list";

import type {UsersBlockingType} from "domains/entities/users.blocking";
import {UsersBlockingEntity} from "domains/entities/users.blocking";

import {IncomingBlockingData} from "data/users/blocking/incoming";
import {OutgoingBlockingData} from "data/users/blocking/outgoing";

type FiltersProps = {
    page: number
    pagesize: number
}

class UsersBlockingAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => {
        return new UsersBlockingAggregate(id, filters, new OutgoingBlockingData())
    });

    public readonly id: IdentifierI;

    private readonly filers: FiltersProps;
    private readonly todo: ToDoList<UsersBlockingEntity>;
    private readonly blockingData: OutgoingBlockingData|IncomingBlockingData;

    private constructor(id: string, filers: FiltersProps, data: OutgoingBlockingData|IncomingBlockingData) {
        this.id = UsersBlockingEntity.id(`by.${id}`);
        this.filers = filers;
        this.blockingData = data;
        this.todo = new ToDoList<UsersBlockingEntity>(this.id, this.read, 0);
    }

    private read = () => {
        return this.blockingData.read().pipe(
            switchMap(it =>
                EntityResult.array(
                    (props) => UsersBlockingEntity.factory(props),
                    it
                )
            )
        )
    }

    public incoming(id: string, filters: FiltersProps) {
        return new UsersBlockingAggregate(id, filters, new IncomingBlockingData());
    }

    public data() {
        return this.todo.get();
    }
}

export type {UsersBlockingType};
export {UsersBlockingAggregate};