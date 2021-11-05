import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {Result} from "utils/result/dto";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserUnmatchedType} from "domains/entities/users.unmatched";
import {UserUnmatchedEntity} from "domains/entities/users.unmatched";

import {UserUnmatchedData} from "data/users/unmatches";

type FiltersProps = {
    page: number
    pagesize: number
}

class UserUnmatchedAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => new UserUnmatchedAggregate(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<UserUnmatchedEntity>;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserUnmatchedEntity.id(`list.${id}`);
        this.filters = filters;
        this.todo = new ToDoList<UserUnmatchedEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return UserUnmatchedData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(UserUnmatchedEntity.factory, it)),
        )
    }
    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserUnmatchedEntity, UserUnmatchedType>(it))
        );
    }
}

export type {UserUnmatchedType, FiltersProps};
export {UserUnmatchedAggregate};