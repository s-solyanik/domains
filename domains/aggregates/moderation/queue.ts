import { of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/entity/to-do-list";

import type {ModerationImageType} from "domains/entities/users.moderation.image";
import {ModerationImageEntity, Reason} from "domains/entities/users.moderation.image";

import {ModerationImageData} from "data/image";
import {Result} from "utils/result/dto";

type FiltersProps = {}

class ModerationImageAggregate {
    static shared = singleton((filters: FiltersProps) => new ModerationImageAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<ModerationImageEntity>;

    private constructor(filters: FiltersProps) {
        this.id = ModerationImageEntity.id('list');
        this.filters = filters;
        this.todo = new ToDoList<ModerationImageEntity>(this.id, this.read, 300);
    }

    private static notFoundError(entity: ModerationImageEntity) {
        return entity ? Result.success(entity) : Result.failure({ status: 404, message: 'Image was not founded'});
    }

    private find(id: string) {
        return this.todo.items().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                const entity = it.value.items.find(it => it.id.equals(ModerationImageEntity.id(id)));

                if(!entity) {
                    return Result.failure({ status: 404, message: 'Image was not founded'});
                }

                return Result.success(entity);
            })
        )
    }

    private read = () => {
        return ModerationImageData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(ModerationImageEntity.factory, it)),
        )
    }

    public approve(id: string) {
        return this.find(id).pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const approved = it.value.approve();

                return ModerationImageData.facade.update(approved.get()).pipe(
                    map(() => ModerationImageAggregate.notFoundError(approved)),
                    switchMap(this.todo.update)
                )
            })
        )
    }

    public decline(id: string, reason: Reason) {
        return this.find(id).pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const declined = it.value.setReason(reason).decline();

                return ModerationImageData.facade.update(declined.get()).pipe(
                    map(() => ModerationImageAggregate.notFoundError(declined)),
                    switchMap(this.todo.update)
                )
            })
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<ModerationImageEntity, ModerationImageType>(it))
        );
    }
}

export type {ModerationImageType, FiltersProps};
export {ModerationImageAggregate};