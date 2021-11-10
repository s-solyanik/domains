import { Observable } from 'rxjs';

import { Result, SuccessfulResult } from 'utils/result/dto';

class DeviceData {
    public read() {
        return new Observable<SuccessfulResult<any>>(observer => {
            observer.next(
                Result.success(true)
            );
            observer.complete();
        });
    }

    static get facade() {
        return new DeviceData();
    }
}

export { DeviceData };
