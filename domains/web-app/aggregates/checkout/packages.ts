import {of, EMPTY} from "rxjs";
import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {Result} from "utils/result/dto";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {PaymentsPackageType, PackageIds} from "domains/entities/payments.packages";
import {PaymentsPackageEntity, PACKAGES} from "domains/entities/payments.packages";

class PaymentsPackageAggregate {
    static shared = singleton(() => new PaymentsPackageAggregate());

    public readonly id: IdentifierI;
    private readonly todo: ToDoList<PaymentsPackageEntity>;

    private constructor() {
        this.id = PaymentsPackageEntity.id('list');
        this.todo = new ToDoList<PaymentsPackageEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return of(Result.success({
            items: PACKAGES,
            total: PACKAGES.length
        })).pipe(
            switchMap(it => EntityResult.array(PaymentsPackageEntity.factory, it))
        )
    }

    public find(id: PackageIds) {
        return this.todo.items().pipe(
            switchMap(it => {
                const activePackage = it.value.items.find(item => item.id.equals(PaymentsPackageEntity.id(id)));

                if(!activePackage) {
                    return EMPTY;
                }

                return of(Result.success(activePackage));
            })
        );
    }

    public findAll(...ids: PackageIds[]) {
        if(!ids) {
            return this.data();
        }

        return this.todo.items().pipe(
            switchMap(it => {
                const packages = it.value.items.filter(item => {
                    return ids.some(id => item.id.equals(PaymentsPackageEntity.id(id)))
                });

                if(!packages?.length) {
                    return EMPTY;
                }

                return of(Result.success(packages));
            })
        );
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => {
                return EntityResult.arrayGet<PaymentsPackageEntity, PaymentsPackageType>(it).pipe(
                    switchMap(it => {
                        if(!it.isSuccessful) {
                            return EMPTY;
                        }

                        return of(Result.success(it.value.items));
                    })
                )
            }),
        );
    }
}

export type {PaymentsPackageType};
export {PaymentsPackageAggregate};