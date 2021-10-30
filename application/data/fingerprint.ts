import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type { FingerprintType } from "domains/test/fingerptint";

class FingerprintData extends Data {
    read() {
        return new Observable<FingerprintType>(observer => {
            observer.next({
                guid: 'test',
                user: 'user-1',
                client: 'web_01'
            });
            observer.complete();
        })
    }

    update(value: Partial<FingerprintType>) {
        return new Observable<FingerprintType>(observer => {
            observer.next({
                guid: 'test',
                user: 'user-1',
                client: 'web_01',
                ...value
            });
            observer.complete();
        })
    }

    static get facade() {
        return new FingerprintData();
    }
}

export { FingerprintData }