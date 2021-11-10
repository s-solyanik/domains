import {of} from "rxjs";
import {map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import { UID} from "utils/unique-id";
import {Result,FAILURE_MESSAGE} from "utils/result/dto";

import {Entity} from "domains/core/entity";
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

    constructor() {
        this.id = UID.factory(Entity.name, 'payments.receipt.base');
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
            })
        )
    }
}

export {PaymentsBaseReceiptAggregate}