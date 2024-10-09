import { message } from 'antd'
//将ui和逻辑进行了分离

interface CheckCondition {
    format: string[]
    size: number
}
type ErrorType = 'size' | 'format' | null
function beforeUploadCheck(file: File, condition: CheckCondition) {
    const { format, size } = condition
    const isValidFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? file.size / 1024 / 1024 < size : true
    let error: ErrorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    if (!isValidSize) {
        error = 'size'
    }
    return {
        error,
        passed: isValidFormat && isValidSize,
    }
}

export function commonUploadCheck(file: File) {
    const result = beforeUploadCheck(file, {
        format: ['image/png', 'image/jpeg'],
        size: 1,
    })
    const { passed, error } = result
    if (error === 'format') {
        message.error('文件格式不正确')
    }
    if (error === 'size') {
        message.error('文件大小超过限制')
    }

    return passed
}

//获取图片的高度和宽度
export const getImageSize = (
    url: string | File,
): Promise<{ width: number; height: number }> =>
    new Promise((resolve, reject) => {
        const img = new Image()
        img.src = typeof url === 'string' ? url : URL.createObjectURL(url)
        img.addEventListener('load', () => {
            const { naturalHeight: height, naturalWidth: width } = img
            resolve({ width, height })
        })
        img.addEventListener('error', () => {
            reject(new Error('图片加载失败'))
        })
    })
