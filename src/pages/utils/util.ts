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

export const getParentElement = (element: HTMLElement, className: string) => {
    while (element) {
        if (element.classList && element.classList.contains(className)) {
            return element
        } else {
            element = element.parentNode as HTMLElement
        }
    }
    return null
}
