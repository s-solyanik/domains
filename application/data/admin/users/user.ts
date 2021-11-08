import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import type { UserI } from "domains/admin/aggregates/users/profiles";
import { USER } from "data/admin/users/user-data";

const initial: UserI = USER;

class UserData extends Data {
    read() {
        return new Observable<Result<{ sql: UserI, es: any }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                sql: initial,
                es: initial
            }));
            observer.complete();
        })
    }

    sendAction(id: number, payload: any) {
        return new Observable(observer => {
            observer.next(Result.success());
            observer.complete();
        })
    }

    create(payload: any, fingerprint: any) {
        return new Observable<Result<UserI, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    update(payload: any) {
        return new Observable<Result<UserI, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    delete(id: string | number) {
        return new Observable(observer => {
            observer.next(Result.success());
            observer.complete();
        })
    }

    static get facade() {
        return new UserData();
    }
}

export { UserData }