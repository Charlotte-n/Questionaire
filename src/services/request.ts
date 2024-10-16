import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import store from '../stores'
import { finishLoading, setError, startLoading } from '../stores/global'
import { getUserInfoAsync, loginout } from '../stores/user'
class HYRequest {
    instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        //添加拦截器
        this.instance.interceptors.request.use(
            (config: any) => {
                const state = store.getState()
                const newConfig = config as AxiosRequestConfig & {
                    opName: string
                }
                if (state.userSlice.token) {
                    config.headers.Authorization = `Bearer ${state.userSlice.token}`
                }

                store.dispatch(setError({ status: false, message: '' }))
                store.dispatch(startLoading({ opName: newConfig.opName }))
                return config
            },
            (error) => {
                return error
            },
        )

        this.instance.interceptors.response.use(
            (res) => {
                const { config } = res
                const newConfig = config as AxiosRequestConfig & {
                    opName: string
                }
                const { errno, message } = res.data

                //登陆到期了
                if (errno && errno === 1005) {
                    message.error('登录过期，请重新登录')
                    store.dispatch(loginout())
                } else {
                    store.dispatch(setError({ status: true, message }))
                }
                store.dispatch(finishLoading({ opName: newConfig.opName }))
                return res.data
            },
            (error) => {
                console.log(error)

                store.dispatch(
                    setError({ status: true, message: '服务器内部错误' }),
                )
                const newConfig = error.config as AxiosRequestConfig & {
                    opName: string
                }
                store.dispatch(finishLoading({ opName: newConfig.opName }))
                return error
            },
        )
    }

    //封装请求方法
    request<T = any>(config: AxiosRequestConfig & { opName: string }) {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res: T) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)

                    reject(err)
                })
        })
    }

    get<T = any>(config: AxiosRequestConfig & { opName: string }) {
        return this.request<T>({
            ...config,
            method: 'GET',
        })
    }

    post<T = any>(config: AxiosRequestConfig & { opName: string }) {
        return this.request<T>({
            ...config,
            method: 'POST',
        })
    }
    delete<T = any>(config: AxiosRequestConfig & { opName: string }) {
        return this.request<T>({
            ...config,
            method: 'DELETE',
        })
    }
    patch<T = any>(config: AxiosRequestConfig & { opName: string }) {
        return this.request<T>({
            ...config,
            method: 'PATCH',
        })
    }
}

export default HYRequest
