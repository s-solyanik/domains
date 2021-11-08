import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {UserPurchasesType} from "domains/entities/users.purchases";
import {UserPurchasesEntity} from "domains/entities/users.purchases";

import {UserPurchasesData} from "data/admin/users/purchases";

type FiltersProps = {
    page: number
    pagesize: number
}

class UserPurchasesAggregate {
    static shared = singleton((id: string, filters: FiltersProps) => new UserPurchasesAggregate(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<UserPurchasesEntity>;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserPurchasesEntity.id(`list.${id}`);
        this.filters = filters;
        this.todo = new ToDoList<UserPurchasesEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return UserPurchasesData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(UserPurchasesEntity.factory, it)),
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<UserPurchasesEntity, UserPurchasesType>(it))
        );
    }
}

export type {UserPurchasesType, FiltersProps};
export {UserPurchasesAggregate};