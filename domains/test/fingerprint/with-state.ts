import {singleton} from "utils/singleton";

import { EntityWithState } from "domains/core/entity/with-state";

import type { UserFingerprintEntity, FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerPrint } from "domains/test/fingerprint/entity";

class FingerprintEntityWithState {
    static shared = singleton((id: string) => {
        return new EntityWithState<UserFingerprintEntity, FingerprintType>(new UserFingerPrint(id))
    })
}

export { FingerprintEntityWithState };