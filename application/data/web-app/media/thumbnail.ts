import { Observable } from 'rxjs';


import { FAILURE_MESSAGE, Result } from 'utils/result/dto';

class MediaData  {
    public read(mediaType: 'jpeg', fingerprint: any) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    public create(url: string, file: File) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    public update(file: File, request: any, fingerprint: any) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new MediaData();
    }
}


export { MediaData };
