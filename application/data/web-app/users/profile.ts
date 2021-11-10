import {FAILURE_MESSAGE, Result} from 'utils/result/dto';
import {Observable} from "rxjs";

class UsersProfileData  {
    public read(fingerprint: any) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    public update(body: any) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new UsersProfileData();
    }
}


export { UsersProfileData };
