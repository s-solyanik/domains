import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {ModerationCategoriesType} from "domains/entities/users.moderation.categories";
import {ModerationCategoriesEntity} from "domains/entities/users.moderation.categories";

import {ModerationCategoriesData} from "data/moderation/queue";

class ModerationCategoriesAggregate {
    static shared = singleton(() => new ModerationCategoriesAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<ModerationCategoriesEntity>;

    private constructor() {
        this.id = ModerationCategoriesEntity.id();
        this.state = new State<ModerationCategoriesEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return ModerationCategoriesData.facade.read().pipe(
            switchMap(it => EntityResult.unit(ModerationCategoriesEntity.factory, it))
        )
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<ModerationCategoriesEntity, ModerationCategoriesType>(it))
        );
    }
}

export type {ModerationCategoriesType};
export {ModerationCategoriesAggregate};