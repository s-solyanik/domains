import {Observable} from "rxjs";

export interface DataI {
    read(...args: any[]): Observable<any>
    create(...args: any[]): Observable<any>
    update(...args: any[]): Observable<any>
    delete(...args: any[]): Observable<any>
}

export abstract class Data implements DataI {
    read(...args: any[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    create(...args: any[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    update(...args: any[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
    delete(...args: any[]): Observable<any> {
        throw new Error('Method is not implemented');
    }
}