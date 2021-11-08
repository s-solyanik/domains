import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {I18nType} from "domains/entities/i18n";
import {I18nEntity} from "domains/entities/i18n";

import {I18nData} from "data/common/i18n/static";

class I18nAggregate {
    static shared = singleton((texts?: Record<string, any>) => new I18nAggregate(texts));

    public readonly id: IdentifierI;
    private readonly state: State<I18nEntity>;

    private constructor(texts?: Record<string, any>) {
        this.id = I18nEntity.id();
        this.state = new State<I18nEntity>(
            this.id,
            !texts ? this.read : () => {
                return new Observable<Result<I18nEntity, FAILURE_MESSAGE>>(observer => {
                    observer.next(Result.success(I18nEntity.factory(texts)));
                    observer.complete();
                })
            },
            7.2e+6
        );
    }

    private read = () => {
        return I18nData.facade.read().pipe(
            switchMap(it => EntityResult.unit(I18nEntity.factory, it))
        )
    }

    //UrlWithStringQuery
    public data(link: any) {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                if(!it.value?.text(link as unknown as URL)) {
                    return Result.failure({
                        status: 404,
                        message: `Text not found for ${link}`
                    });
                }

                return Result.success(it.value.text(link));
            })
        );
    }
}

export type {I18nType};
export {I18nAggregate};