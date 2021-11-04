import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {EntityState} from "domains/core/entity/with-state";

import type {ModerationCategoriesType} from "domains/entities/users.moderation.categories";
import {ModerationCategoriesEntity} from "domains/entities/users.moderation.categories";

import {ModerationCategoriesData} from "data/queue";

class ModerationCategoriesAggregate {
    static shared = singleton(() => new ModerationCategoriesAggregate());

    public readonly id: IdentifierI;
    private readonly state: EntityState<ModerationCategoriesEntity, ModerationCategoriesType>;

    private constructor() {
        this.id = ModerationCategoriesEntity.id();
        this.state = new EntityState<ModerationCategoriesEntity, ModerationCategoriesType>(this.id, this.read, 300);
    }

    private read = () => {
        return ModerationCategoriesData.facade.read().pipe(
            switchMap(it => EntityResult.unit(ModerationCategoriesEntity.factory, it))
        )
    }

    public data() {
        return this.state.data();
    }
}

export type {ModerationCategoriesType};
export {ModerationCategoriesAggregate};