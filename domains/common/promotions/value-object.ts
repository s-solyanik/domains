import { ValueObject } from 'domains/core/entity/value-object';
import { Validation } from 'domains/core/validation';
import type { AdsType } from 'domains/common/promotions/type';

const ALLOWED_TYPES: string[] = ['button', 'swipe', 'popup', 'inline', 'sidebar'];
const ALLOWED_AUDIENCE_TYPE: string[] = [
    'vip',
    'vipelite',
    'free',
    'vip_and_free',
    'vipelite_and_free',
    'paid',
    'everyone'
];

class AdsValueObject extends ValueObject<AdsType> {
    static readonly validationRules = {
        adName: {
            required: true,
            message: 'This field is required'
        },
        organization: {
            required: true,
            message: 'This field is required'
        },
        startDate: {
            required: true,
            message: 'This field is required'
        },
        expiration: {
            required: true,
            message: 'This field is required'
        },
        'file_extension': {
            oneOf: ['jpg', 'gif', 'mp4', 'unknown'],
            message: 'File format is incorrect'
        },
        frequency: {
            required: true,
            message: 'This field is required'
        },
        priority: {
            range: { from: 0, to: 5 },
            message:  'This value should be between 0 and 5'
        },
        backgroundImageURL: {
            or: 'videoURL',
            message: 'Please upload image or add video link'
        },
        videoURL: {
            or: 'backgroundImageURL',
            message: 'Please upload image or add video link'
        },
        adType: {
            oneOf: ALLOWED_TYPES,
            message: `Type has invalid value, allowed values are ${ALLOWED_TYPES}`
        },
        audienceType: {
            oneOf: ALLOWED_AUDIENCE_TYPE,
            message: `Type has invalid value, allowed values are ${ALLOWED_TYPES}`
        }
    };

    public errors() {
        return Validation.factory(AdsValueObject.validationRules).validate(this.get());
    }

    static factory(promotion: AdsType) {
        return new AdsValueObject(promotion);
    }
}

export { AdsValueObject, ALLOWED_TYPES, ALLOWED_AUDIENCE_TYPE };
