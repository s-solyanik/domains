import {Observable} from "rxjs";

import { Data } from "data/core/data";

import { FAILURE_MESSAGE, Result } from "utils/result/dto";
import type { UsersBlockingType} from "domains/entities/users.blocking";

const initial: UsersBlockingType = {
    blockedAt: new Date(),
    data: {
        identifier: 'U.as123123213masdsa-asdqwe12-213',
        age: 12,
        about: 'Bats are amazing!',
        gender: 'other',
        height: 123,
        firstName: 'John',
        id: 12321321321,
        lastName: 'Jonson',
        birthday: new Date(1972, 12, 2)
    },
    media: {
        userId: '123123',
        pictureUrl: 'asdasdasd',
        imageIdentifiers: ['123123123'],
        profilePictures: [{
            identifier: 'asdas',
            createdAt: new Date(),
            moderator: 'asd',
            decision: 'asdasd',
            displayText: 'string',
            moderatedAt: new Date()
        }],
        thumbnail: 'adasdasdasd'
    }
};

class OutgoingBlockingData extends Data {
    read() {
        return new Observable<Result<{ items: UsersBlockingType[]; total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new OutgoingBlockingData();
    }
}

export { OutgoingBlockingData }