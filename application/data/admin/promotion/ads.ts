import {Observable} from "rxjs";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import {singleton} from "utils/singleton";

import { Data } from "data/core/data";
import type { FiltersProps, AdsType } from "domains/admin/aggregates/promotions/ads";

export const ADS_TEMP = {
    adName: "elite - video - instant match - male - 10/21/21",
    adType: "swipe",
    audienceType: "free",
    backgroundImageURL: null,
    deeplink: "showvipeliteinstantmatches",
    deeplinkButtonTitle: "",
    description: "",
    expiration: '2021-10-12',
    file_extension: "",
    frequency: 3,
    id: 194,
    identifier: "U.5eb45e82-3296-11ec-b2b1-0a4927a22a",
    organization: "Dil Mil ",
    priority: 0,
    startDate: '2021-10-12',
    targetCountries: [],
    targetGender: "male",
    targetUserProfiles: [],
    videoURL: "https://cdnmojo.dilmil.co/ads/A.RUNDIHJ9DHX5OHYCU0.mp4"
} as unknown as AdsType;

class AdsData extends Data {
    static shared = singleton(() => new AdsData());

    private readonly ids = [0];
    private readonly codes: AdsType[];

    constructor() {
        super();
        const t = this.ids.map((id, index) => ({
            ...ADS_TEMP,
            id: id
        }))
        this.codes = t as unknown as AdsType[]
    }

    read(filters: FiltersProps) {
        return new Observable<Result<{ items: AdsType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({ items: this.codes as AdsType[], total: this.codes.length }));
            observer.complete();
        })
    }

    create(value: AdsType) {
        return new Observable<Result<AdsType, FAILURE_MESSAGE>>(observer => {
            this.ids.push(this.ids.length);

            observer.next(
                Result.success({
                    ...ADS_TEMP,
                    ...value,
                    id: this.ids.length - 1
                } as AdsType)
            );
            observer.complete();
        })
    }

    update(id: number, value: Partial<AdsType>) {
        return new Observable<Result<AdsType, FAILURE_MESSAGE>>(observer => {
            observer.next(
                Result.success({
                    ...ADS_TEMP,
                    ...value,
                    id: id
                } as AdsType)
            );
            observer.complete();
        })
    }

    delete(id: number) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return AdsData.shared();
    }
}

export { AdsData }