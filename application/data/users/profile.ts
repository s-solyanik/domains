import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import type { UserI } from "domains/admin/user";

const initial: UserI = {
    data: {
        id: 123123,
        identifier: 'U.as123123213masdsa-asdqwe12-213',
        age: 12,
        about: 'Bats are amazing!',
        gender: 'other',
        height: 123,
        firstName: 'John',
        lastName: 'Jonson',
        birthday: new Date(1972, 12, 2)
    },
    location: {
        id: 123123,
        city: 'New York',
        country: 'USA',
        state: '',
        latitude: 12.12312,
        longitude: 31.213,
        address: 'St. Paul'
    },
    media: {
        id: 123123,
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
    },
    meta: {
        id: 123123,
        community: 'string',
        education: 'string',
        occupation: 'string',
        profileInterests: null,
        religion: 'string',
        subscriptions: [] as string[],
        subscriptionsDate: new Date(),
        raisedIn: 'string',
        phoneNumber: 'string',
        verificationStatus: 'notStarted',
        notes: 'string',
        review: 'string',
        verificationPictures: [],
        educationInfo: null,
        occupationInfo: null,
        profileTitle: 'string',
        updatedAt: new Date(),
        createAt: new Date(),
        email: 'string',
        isDeleted: false,
        details: [],
        prompts: [],
        analyticsLinks: []
    }
};

class UserData extends Data {
    read() {
        return new Observable<Result<UserI, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    static get facade() {
        return new UserData();
    }
}

export { UserData }