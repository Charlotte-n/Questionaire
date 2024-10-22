import html2canvas from 'html2canvas'
import hyRequest from '../../services'
import { ResponseType } from '../../apis/interface'
import { uploadFileRes } from './interface'

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

//上传函数
export const uploadFile = async <T>(
    file: Blob,
    url = '/utils/uploadImgOSS',
    fileName: 'test.png',
) => {
    const newFile = file instanceof File ? file : new File([file], fileName)
    const formData = new FormData()
    formData.append('fileName', newFile)
    const res = await hyRequest.post<ResponseType<T>>({
        url,
        data: formData,
        opName: 'uploadFile',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return res.data
}

const getCanvasBlob = (canvas: HTMLCanvasElement) => {
    return new Promise<Blob | null>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob)
            } else {
                reject(new Error('Canvas toBlob conversion failed'))
            }
        }, 'image/png')
    })
}

//html2canvas截图并且上传
export const takeScreenshotAndUpload = async (el: HTMLElement) => {
    const canvas = await html2canvas(el, {
        allowTaint: false,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
    })
    const blob = await getCanvasBlob(canvas)
    if (blob) {
        const data = await uploadFile<uploadFileRes>(
            blob,
            '/utils/uploadImgOSS',
            'test.png',
        )
        return data
    }
}

// 下载的原理

// 下载图片
