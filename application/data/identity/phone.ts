import { Observable } from 'rxjs';

import { Result, FAILURE_MESSAGE } from 'utils/result/dto';

type Fb = {
    guid: string
    identifier: string
    invitedBy: Array<string>
    loggedIn: boolean
}

class IdentityPhoneData {
    public read() {
        return new Observable<Result<Fb, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                guid: 'string',
                identifier: 'string',
                invitedBy: [],
                loggedIn: true
            }));
            observer.complete();
        })
    }

    public create(elementId: string, phone: string) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    public update(code: string, confirmation?: any) {
        return new Observable<Result<Fb, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                guid: 'string',
                identifier: 'string',
                invitedBy: [],
                loggedIn: true
            }));
            observer.complete();
        })
    }

    public store(identity: any) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    public user() {
        return new Observable<Result<{ token: string, phone: string  }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({ token: 'asdsa', phone: 'asd' }));
            observer.complete();
        })
    }

    static get facade() {
        return new IdentityPhoneData();
    }
}

export { IdentityPhoneData };
