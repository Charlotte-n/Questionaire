import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class HYRequest {
    instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        //添加拦截器
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (error) => {
                return error
            },
        )

        this.instance.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                return error
            },
        )
    }

    //封装请求方法
    request<T = any>(config: AxiosRequestConfig<T>) {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    get<T = any>(config: T) {
        return this.request({
            ...config,
            method: 'GET',
        })
    }

    post<T = any>(config: AxiosRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'POST',
        })
    }
    delete<T = any>(config: AxiosRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'DELETE',
        })
    }
    patch<T = any>(config: AxiosRequestConfig<T>) {
        return this.request({
            ...config,
            method: 'PATCH',
        })
    }
}

export default HYRequest
