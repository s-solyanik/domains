import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type { UserType } from "domains/aggregates/users";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial: UserType = {
    identifier: 'U.as123123213masdsa-asdqwe12-213',
    age: 123,
    about: 'Bats are amazing!',
    gender: 'other',
    height: 123,
    firstName: 'John',
    id: null,
    lastName: 'Jonson',
    birthday: new Date(1972, 12, 2)
}

class UserData extends Data {
    read() {
        return new Observable<Result<UserType, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    update(id: string, value: Partial<UserType>) {
        return new Observable<Result<UserType, FAILURE_MESSAGE>>(observer => {
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
        return new UserData();
    }
}

export { UserData }