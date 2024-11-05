export interface sendCodeApiType {
    verifyCode: string
}

export interface loginByPhoneNumberApiType {
    token: string
}

export interface UserInfo {
    _id?: string
    username?: string
    nickname?: string
    updatedAt?: string
    createdAt?: string
    avatar?: string
    id?: number
}
