import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type { FiltersProps } from "domains/test/entity";
type DataProps = {
    guid: string
    user: string
    client: 'web_01'
}

class FingerprintData extends Data {
    read<FiltersProps>(filters: FiltersProps) {
        console.log('data filters', filters);

        return new Observable<DataProps>(observer => {
            observer.next({
                guid: 'test',
                user: 'user-1',
                client: 'web_01'
            });
            observer.complete();
        })
    }

    static get facade() {
        return new FingerprintData();
    }
}

export { FingerprintData }