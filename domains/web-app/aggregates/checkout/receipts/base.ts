import {EMPTY, of} from "rxjs";
import {map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import { UID} from "utils/unique-id";
import {Result,FAILURE_MESSAGE} from "utils/result/dto";

import {Entity} from "domains/core/entity";
import {State} from "domains/core/state";

import type { PackageIds } from "domains/entities/payments.packages";

import type { FingerprintType } from 'domains/aggregates/indentity/fingerprint';
import { UserFingerPrintAggregate } from 'domains/aggregates/indentity/fingerprint';

type ReceiptBaseInput = {
    forMe: boolean
    packageId: PackageIds
    beneficiaryName: string|null
    beneficiaryEmail: string|null
}

type ReceiptBaseOutPut = FingerprintType & {
    forMe: boolean
    product: PackageIds
    beneficiaryName: string|null
    beneficiaryEmail: string|null
}

class PaymentsBaseReceiptAggregate {
    public readonly id: IdentifierI;
    private readonly state: State<ReceiptBaseOutPut>;

    constructor() {
        this.id = UID.factory(Entity.name, 'payments.receipt.base');
        this.state = new State<ReceiptBaseOutPut>(this.id, this.read, 0)
    }

    private read() {
        return EMPTY;
    }

    public create(receipt: ReceiptBaseInput) {
        if(!receipt.packageId) {
            return of(
                Result.failure({
                    status: 0,
                    message: 'Payment package is undefined'
                } as FAILURE_MESSAGE)
            )
        }

        return UserFingerPrintAggregate.shared().data().pipe(
            map(it => {
                return Result.success({
                    ...it.value,
                    forMe: receipt.forMe,
                    product: receipt.packageId,
                    beneficiaryName: receipt.beneficiaryName,
                    beneficiaryEmail: receipt.beneficiaryEmail,
                })
            }),
            map(it => this.state.update(it))
        )
    }

    public data() {
        return this.state.data();
    }
}

export {PaymentsBaseReceiptAggregate}