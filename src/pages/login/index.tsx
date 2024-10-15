import { Button, Form, Input, Layout, message, Slider } from 'antd'
import React, { FC, useState, useRef, useEffect } from 'react'
import { Rules } from './config'
import { produce } from 'immer'
import { loginByPhoneNumber, sendCode } from '../../apis/user/login'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../stores'
import {
    getUserInfoAsync,
    setIsLogin,
    setToken,
    setUserInfo,
} from '../../stores/user'
import { opNameIsLoading } from '../../stores/global'
import store from '../../stores/index'

type FieldType = {
    phoneNumber?: string
    verifyCode?: string
}

const Login: FC = () => {
    const [form] = Form.useForm()
    const [formData, setFormData] = useState({
        phoneNumber: '',
        verifyCode: '',
    })
    const [count, setCount] = useState(60)
    const timer = useRef<number | null>(null)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { errors } = useAppSelector((state) => state.globalSlice)
    //倒计时
    const countDown = () => {
        setCount(60)
        const timer = setInterval(() => {
            setCount((prev) => prev - 1)
        }, 1000)
        return timer
    }

    //发送验证码
    const handleGetVerifyCodeApi = async () => {
        try {
            const res = await sendCode({
                phoneNumber: formData.phoneNumber,
            })
            if (res.code !== 0) {
                return
            }
            message.success('验证码发送成功,请注意查收')

            //触发倒计时
            produce(timer, (draft: any) => {
                draft.current = countDown()
            })
            setDisabled(true)
        } catch (e) {}
    }

    //手机登陆
    const handleLoginByPhone = async () => {
        try {
            const result = await loginByPhoneNumber({
                phoneNumber: formData.phoneNumber,
                verifyCode: formData.verifyCode,
            })
            await form.validateFields()
            if (result.code === 0) {
                message.success('登录成功')
                dispatch(setToken(result.data.token))
                // 获取用户信息
                dispatch(getUserInfoAsync(formData.phoneNumber))
                navigate('/')
            }
        } catch (e) {
            message.error('校验失败', 2)
        }
    }

    useEffect(() => {
        if (errors.status) {
            message.error(errors.message || '未知错误', 2)
        }
    }, [errors.status])
    useEffect(() => {
        if (count < 0) {
            clearInterval(timer.current as number)
            setDisabled(false)
        }
        return () => {
            clearInterval(timer.current as number)
        }
    }, [count])

    return (
        <Layout className="h-[100vh] flex-row bg-[white]">
            <div
                className="flex justify-center items-center w-[50vw] h-[100%] bg-no-repeat bg-cover text-[white]"
                style={{
                    backgroundImage:
                        'url("https://oss.imooc-lego.com/editor/img/login.e8146602.png")',
                }}
            >
                <div className="text-center">
                    <div className="text-[30px] mb-[30px]">Merikle 海报</div>
                    <div className="text-[25px]">
                        这是我用过的最好的建站网站
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center h-[100%]">
                <Form form={form}>
                    <h1>欢迎回来</h1>
                    <div className="mb-[15px] text-[20px] text-[#666666]">
                        使用手机号码和验证码登录Merikle海报
                    </div>
                    <Form.Item<FieldType>
                        rules={Rules.phoneNumber}
                        name="phoneNumber"
                    >
                        <Input
                            placeholder="请输入手机号"
                            className="rounded-full bg-[#ebf2ff] border-[#ebf2ff] px-[20px] py-[10px]"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData(
                                    produce((draft) => {
                                        draft.phoneNumber = e.target.value
                                    }),
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        rules={Rules.verifyCode}
                        name="verifyCode"
                    >
                        <Input
                            placeholder="请输入验证码"
                            className="rounded-full bg-[#ebf2ff] border-[#ebf2ff] px-[20px] py-[10px]"
                            value={formData.verifyCode}
                            onChange={(e) =>
                                setFormData(
                                    produce((draft) => {
                                        draft.verifyCode = e.target.value
                                    }),
                                )
                            }
                        />
                    </Form.Item>
                    <div className="flex">
                        <Button
                            type="primary"
                            className=" rounded-full mr-[10px]"
                            onClick={handleLoginByPhone}
                            loading={opNameIsLoading(
                                store,
                                'loginByPhoneNumber',
                            )}
                        >
                            登录
                        </Button>
                        <Button
                            className="rounded-full"
                            onClick={handleGetVerifyCodeApi}
                            disabled={disabled}
                        >
                            {disabled
                                ? `${count}秒后重新获取验证码`
                                : '获取验证码'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Layout>
    )
}

export default Login
