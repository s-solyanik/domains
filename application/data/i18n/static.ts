import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial = {
    'https://test.co/text': '123',
};

class I18nData extends Data {
    read() {
        return new Observable<Result<Record<string, string>, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    static get facade() {
        return new I18nData();
    }
}

export { I18nData }