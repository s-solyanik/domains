import jwtDecode from 'jwt-decode';

import { ValueObject } from 'domains/core/entity/value-object';
import type { IdentityType } from 'domains/common/identity.email/type';

class IdentityValueObject extends ValueObject<IdentityType> {
    private static readonly ms = 1000;

    private static decode(access: string, refresh: string, email: string) {
        //exp in sec
        const { exp: expAccess }: { exp: number } = jwtDecode(access);
        const { exp: expRefresh }: { exp: number } = jwtDecode(refresh);

        return {
            tokens: {
                access: {
                    value: access,
                    exp: expAccess * IdentityValueObject.ms
                },
                refresh: {
                    value: refresh,
                    exp: expRefresh * IdentityValueObject.ms
                },
            },
            email: email
        };
    }

    static factory(access: string, refresh: string, email: string): IdentityValueObject {
        return new IdentityValueObject(
            IdentityValueObject.decode(access, refresh, email)
        );
    }
}


export { IdentityValueObject };
