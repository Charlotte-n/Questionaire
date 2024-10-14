import hyRequest from '../../services'
import { loginByPhoneNumberApiType, sendCodeApiType } from './interface'
import { ResponseType } from '../interface'
import { UserStateType } from '../../stores/user'

export const sendCode = (data: { phoneNumber: string }) => {
    const { phoneNumber } = data
    return hyRequest.post<ResponseType<sendCodeApiType>>({
        url: '/user/sendVerifyCode',
        data: {
            phoneNumber,
        },
        opName: 'sendCode',
    })
}

export const loginByPhoneNumber = (data: {
    phoneNumber: string
    verifyCode: string
}) => {
    return hyRequest.post<ResponseType<loginByPhoneNumberApiType>>({
        url: '/user/loginByPhone',
        data,
        opName: 'loginByPhoneNumber',
    })
}

export const getUserInfo = (params: string) => {
    return hyRequest.get<ResponseType<UserStateType>>({
        url: `/user/userInfo/${params}`,
        opName: 'getUserInfo',
    })
}
