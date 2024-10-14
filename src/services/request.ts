import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Store from 'redux'
import { store } from '../stores'
class HYRequest {
    instance: AxiosInstance
    private store

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.store = store

        //添加拦截器
        this.instance.interceptors.request.use(
            (config) => {
                const state = this.store.getState()
                if (state.userSlice.token) {
                    config.headers.Authorization = `Bearer ${state.userSlice.token}`
                }
                return config
            },
            (error) => {
                return error
            },
        )

        this.instance.interceptors.response.use(
            (res) => {
                return res.data
            },
            (error) => {
                return error
            },
        )
    }

    //封装请求方法
    request<T = any>(config: AxiosRequestConfig) {
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

    get<T = any>(config: AxiosRequestConfig) {
        return this.request<T>({
            ...config,
            method: 'GET',
        })
    }

    post<T = any>(config: AxiosRequestConfig) {
        return this.request<T>({
            ...config,
            method: 'POST',
        })
    }
    delete<T = any>(config: AxiosRequestConfig) {
        return this.request<T>({
            ...config,
            method: 'DELETE',
        })
    }
    patch<T = any>(config: AxiosRequestConfig) {
        return this.request<T>({
            ...config,
            method: 'PATCH',
        })
    }
}

export default HYRequest
