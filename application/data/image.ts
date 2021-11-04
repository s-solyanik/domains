import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import type { FiltersProps, ModerationImageType } from "domains/aggregates/moderation/queue";

const initial = {
    action: "report",
    createdAt: "2021-11-04 01:00:13 +0000",
    identifier: "I.GI2DCMNROSFNL5LQUI",
    note: "Fake profile ",
    poseImageUrl: null,
    profileCountry: "US",
    profileId: 820327,
    profileImageUrl: null,
    profileName: "Nisha",
    reason: "stolen_photo",
    url: "https://cdnmojo.dilmil.co/profile/U.DEIVVTPZBWIG5OILKF/I.GI2DCMNROSFNL5LQUI.jpg",
    verificationStatus: "notStarted",
} as unknown as ModerationImageType;

class ModerationImageData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 0
            }));
            observer.complete();
        })
    }

    update(value: ModerationImageType) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new ModerationImageData();
    }
}

export { ModerationImageData }