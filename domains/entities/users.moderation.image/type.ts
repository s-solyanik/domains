export enum Action {
    APPROVE = 'approved',
    DECLINE = 'declined'
}

export enum Reason {
    NO_PEOPLE = 'noPeople',
    MULTIPLE_PEOPLE = 'multiplePeople',
    NO_SOUTH_ASIAN = 'notSouthAsian',
    PORNOGRAPHY = 'pornography',
    NUDITY = 'nudity',
    PETS_OBJECT = 'petsObjects',
    SUNGLASSES = 'sunglasses',
    CELEBRITY = 'celebrity',
    UNCLEAR_FACE = 'unclearFace',
    CHILD_ADOLESCENT = 'childAdolescent',
    INCORRECT_GENDER = 'incorrectGender',
    UNDER_AGE = 'underAge',
    INAPPROPRIATE_PROFILE = 'inappropriatePhoto',
    STOLE_PHOTO = 'stolenPhoto',
    HQ_PHOTO = 'hQPhotoNeeded',
    PHOTO_MISMATCH = 'photoMismatch'
}

export type ModerationImageType = {
    id: number
    identifier: string
    url: URL
    note: string|null
    name: string
    reason: 'noPeople'
    |'multiplePeople'
    |'notSouthAsian'
    |'pornography'
    |'nudity'
    |'petsObjects'
    |'sunglasses'
    |'celebrity'
    |'unclearFace'
    |'childAdolescent'
    |'incorrectGender'
    |'underAge'
    |'inappropriatePhoto'
    |'stolenPhoto'
    |'hQPhotoNeeded'
    |'photoMismatch'
    |null
    action: 'approved'|'declined'|null
    createdAt: Date
    profileImageUrl: URL|null
    poseImageUrl: URL|null
    verificationStatus: 'notStarted'|'pending'|'approved'|'declined'
};
