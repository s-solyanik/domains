import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type { FingerprintType } from "domains/aggregates/indentity/fingerprint";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial: FingerprintType = {
    guid: 'test',
    user: 'user-1',
    client: 'web_01'
};

class FingerprintData extends Data {
    read() {
        return new Observable<Result<FingerprintType, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.failure({
                status: 403,
                message: 'Forbidden'
            }));
            observer.complete();
        })
    }

    update(value: Partial<FingerprintType>) {
        return new Observable<Result<FingerprintType, FAILURE_MESSAGE>>(observer => {
            observer.next(
                Result.success({
                    ...initial,
                    ...value
                })
            );
            observer.complete();
        })
    }

    static get facade() {
        return new FingerprintData();
    }
}

export { FingerprintData }