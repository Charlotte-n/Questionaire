import hyRequest from '../../services'
import { loginByPhoneNumberApiType, sendCodeApiType } from './interface'
import { ResponseType } from '../interface'

export const sendCode = (data: { phoneNumber: string }) => {
    const { phoneNumber } = data
    return hyRequest.post<ResponseType<sendCodeApiType>>({
        url: '/user/sendVerifyCode',
        data: {
            phoneNumber,
        },
    })
}

export const loginByPhoneNumber = (data: {
    phoneNumber: string
    verifyCode: string
}) => {
    return hyRequest.post<ResponseType<loginByPhoneNumberApiType>>({
        url: '/user/loginByPhone',
        data,
    })
}
