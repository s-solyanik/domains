import {Observable} from "rxjs";

export interface DataI {
    read<T>(...args: T[]): Observable<any>
    create<T>(...args: T[]): Observable<any>
    update<T>(...args: T[]): Observable<any>
    delete<T>(...args: T[]): Observable<any>
}

export abstract class Data implements DataI {
    read<T>(...args: T[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    create<T>(...args: T[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    update<T>(...args: T[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    delete<T>(...args: T[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
}