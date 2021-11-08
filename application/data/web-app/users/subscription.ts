import {FAILURE_MESSAGE, Result} from 'utils/result/dto';
import {Observable} from "rxjs";

class SubscriptionsData  {
    public read(fingerprint: any) {
        return new Observable<Result<{  items: any[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [],
                total: 0
            }));
            observer.complete();
        })
    }

    public delete(body: any) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new SubscriptionsData();
    }
}


export { SubscriptionsData };
