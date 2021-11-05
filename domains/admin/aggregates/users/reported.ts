import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserReportedType} from "domains/entities/users.reported";
import {UserReportedEntity} from "domains/entities/users.reported";

import {UserReportedData} from "data/users/reported";

type FiltersProps = {
    page: number
    pagesize: number
}

class UserReportedAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => new UserReportedAggregate(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<UserReportedEntity>;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserReportedEntity.id(`list.${id}`);
        this.filters = filters;
        this.todo = new ToDoList<UserReportedEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return UserReportedData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(UserReportedEntity.factory, it)),
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserReportedEntity, UserReportedType>(it))
        );
    }
}

export type {UserReportedType, FiltersProps};
export {UserReportedAggregate};