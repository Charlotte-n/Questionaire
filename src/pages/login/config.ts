export const Rules = {
    phoneNumber: [
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
    ],
    verifyCode: [
        { required: true, message: '请输入验证码' },
        { length: 6, message: '验证码为6位数字' },
    ],
}
