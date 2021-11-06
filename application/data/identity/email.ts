import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

type Tokens = {
    access: string
    refresh: string
}

const tokens = {
    access: 'test',
    refresh: 'user-1'
};

type create = {
    email: string
    password: string
    client: 'web_101'
}

class IdentityEmailData extends Data {
    read() {
        return new Observable<Result<Tokens, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(tokens));
            observer.complete();
        })
    }

    create(value: create) {
        return new Observable<Result<Tokens, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(tokens));
            observer.complete();
        })
    }

    update(value: Partial<any>) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    delete() {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    store(payload: any) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    refresh(refresh: string) {
        return new Observable<Result<{ access: string  }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({access: 'asdsa'}));
            observer.complete();
        })
    }

    static get facade() {
        return new IdentityEmailData();
    }
}

export { IdentityEmailData }