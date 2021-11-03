export type AdsType = {
    identifier: string
    id: number
    organization: string
    audienceType: 'vip'|'vipelite'|'free'|'vip_and_free'|'vipelite_and_free'|'paid'|'everyone'
    adName: string
    description: string|null
    startDate: string
    expiration: string
    videoURL: string|null
    backgroundImageURL: string
    deeplink: string
    deeplinkButtonTitle: string|null
    adType: 'button'|'swipe'|'popup'|'inline'|'sidebar'
    priority: number
    frequency: number
    targetCountries: null|[]|string[]
    targetUserProfiles: number[]
    targetGender: 'male'|'female'|'other'|'all'
    'file_extension': 'jpg'|'gif'|'mp4'|'unknown'
};
