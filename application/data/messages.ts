import {Observable} from "rxjs";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import { Data } from "data/core/data";

import type { FiltersProps, DialogsMessageType } from "domains/aggregates/dialogs/messages";

const initial: DialogsMessageType = {
    sender: 123,
    message: 'test',
    type: 'string',
    reaction: 'ha',
    date: new Date()
}

class MessagesData extends Data {
    read(sender: number, recipient: number, filters: FiltersProps) {
        return new Observable<Result<{ items: DialogsMessageType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new MessagesData();
    }
}

export { MessagesData }