import type {UserDataType} from "domains/entities/users.data";
import type {UserLocationType} from "domains/entities/users.location";
import type {UserMediaType} from "domains/entities/users.media";
import type {UserMetaType} from "domains/entities/users.meta";
import type {UserPreferenceType} from "domains/entities/users.preference";
import type {UserSocialType} from "domains/entities/users.social";
import type {UserDevicesType} from "domains/entities/users.devices";
import type {UserBonusesType} from "domains/entities/users.bonuses";

const USER = {
    data: {
        id: 1,
        identifier: 'U.as123123213masdsa-asdqwe12-213',
        age: 12,
        about: 'Bats are amazing!',
        gender: 'other',
        height: 123,
        firstName: 'John',
        lastName: 'Jonson',
        birthday: new Date(1972, 12, 2)
    } as UserDataType,
    location: {
        id: 1,
        city: 'New York',
        country: 'USA',
        state: '',
        latitude: 12.12312,
        longitude: 31.213,
        address: 'St. Paul'
    } as UserLocationType,
    media: {
        id: 1,
        pictureUrl: 'asdasdasd',
        imageIdentifiers: ['123123123'],
        profilePictures: [{
            identifier: 'asdas',
            createdAt: new Date(),
            moderator: 'asd',
            decision: 'asdasd',
            displayText: 'string',
            moderatedAt: new Date()
        }],
        thumbnail: 'adasdasdasd'
    } as UserMediaType,
    meta: {
        id: 1,
        community: 'string',
        education: 'string',
        occupation: 'string',
        profileInterests: null,
        religion: 'string',
        subscriptions: [] as string[],
        subscriptionsDate: new Date(),
        raisedIn: 'string',
        phoneNumber: 'string',
        verificationStatus: 'notStarted',
        notes: 'string',
        review: 'string',
        verificationPictures: [],
        educationInfo: null,
        occupationInfo: null,
        profileTitle: 'string',
        updatedAt: new Date(),
        createAt: new Date(),
        email: 'string',
        isDeleted: false,
        details: [],
        prompts: [],
        analyticsLinks: []
    } as UserMetaType,
    preference: {
        id: 1,
        prefGender: 'male',
        prefMaxAge: 23,
        prefMinAge: 23,
        prefMinHeight: 34,
        prefMaxHeight: 34,
        prefReligion: [],
        prefRaisedIn: [],
        prefOccupation: [],
        prefCommunity: [],
        prefEducation: [],
        searchLocation: []
    } as UserPreferenceType,
    social: {
        id: 1,
        facebookId: 'string',
        facebookToken: null,
        facebookLikes: null,
        facebookVerified: false,
        facebookFriends: null,
        facebookUserName: null,
        instagramLinks: [],
        instagramName: null,
        instagramToken: null,
        linkedin: null,
        linkedinAccessToken: null
    } as UserSocialType,
    installations: [
        {
            id: 1,
            deviceOsType: 'string',
            deviceOsVersion: 'string',
            deviceAppVersion: 'string'
        }
    ] as UserDevicesType[],
    bonuses: {
        id: 1,
        dils: 31,
        bought: 2,
        daily: 4,
        notes: 1,
        boosts: 2,
        superLike: 3,
        readReceipt: 4,
        dilsLastRefilled: new Date(),
        superLikeExpiration: new Date(),
        notesExpiration: new Date(),
        boostsExpiration: new Date(),
        readReceiptsExpiration: new Date(),
    } as UserBonusesType
}

export { USER };