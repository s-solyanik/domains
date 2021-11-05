import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserImpressionType} from "domains/entities/users.impressions";
import {UserImpressionEntity} from "domains/entities/users.impressions";

import {UserImpressionData} from "data/users/impression";

type FiltersProps = {
    page: number
    pagesize: number
}

class UserImpressionAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => new UserImpressionAggregate(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<UserImpressionEntity>;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserImpressionEntity.id(`list.${id}`);
        this.filters = filters;
        this.todo = new ToDoList<UserImpressionEntity>(this.id, this.read, 1000);
    }

    private read = () => {
        return UserImpressionData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(UserImpressionEntity.factory, it)),
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserImpressionEntity, UserImpressionType>(it))
        );
    }
}

export type {UserImpressionType, FiltersProps};
export {UserImpressionAggregate};