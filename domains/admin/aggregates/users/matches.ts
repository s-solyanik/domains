import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserMatchesType} from "domains/entities/users.matches";
import {UserMatchesEntity} from "domains/entities/users.matches";

import {UserMatchesData} from "data/users/matches";

type FiltersProps = {
    page: number
    pagesize: number
}

class UserMatchesAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => new UserMatchesAggregate(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<UserMatchesEntity>;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserMatchesEntity.id(`list.${id}`);
        this.filters = filters;
        this.todo = new ToDoList<UserMatchesEntity>(this.id, this.read, 1000);
    }

    private read = () => {
        return UserMatchesData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(UserMatchesEntity.factory, it)),
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserMatchesEntity, UserMatchesType>(it))
        );
    }
}

export type {UserMatchesType, FiltersProps};
export {UserMatchesAggregate};