import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Store from 'redux'
import { store } from '../stores'
import { finishLoading, setError, startLoading } from '../stores/global'
class HYRequest {
    instance: AxiosInstance
    private store

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.store = store

        //添加拦截器
        this.instance.interceptors.request.use(
            (config: any) => {
                const state = this.store.getState()
                const newConfig = config as AxiosRequestConfig & {
                    opName: string
                }
                if (state.userSlice.token) {
                    config.headers.Authorization = `Bearer ${state.userSlice.token}`
                }
                this.store.dispatch(setError({ status: false, message: '' }))
                this.store.dispatch(startLoading({ opName: newConfig.opName }))
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
                if (errno && errno !== 0) {
                    this.store.dispatch(setError({ status: true, message }))
                }
                this.store.dispatch(finishLoading({ opName: newConfig.opName }))
                return res.data
            },
            (error) => {
                this.store.dispatch(
                    setError({ status: true, message: '服务器内部错误' }),
                )
                const newConfig = error.config as AxiosRequestConfig & {
                    opName: string
                }
                this.store.dispatch(finishLoading({ opName: newConfig.opName }))
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
