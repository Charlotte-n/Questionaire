// 防抖方法
export const debounce = (callback: any, timeout = 1000) => {
    let timer: any = null
    return (...args: any) => {
        clearTimeout(timer)
        timer = window.setTimeout(() => {
            callback(...args)
        }, timeout)
    }
}
