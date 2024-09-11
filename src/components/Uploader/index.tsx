import React, { memo, useRef } from 'react'
import type { FC, LegacyRef, ReactNode } from 'react'
import axios from 'axios'
import { MergeProps } from '../../stores/commonproperties'

interface IProps {
    children?: ReactNode
    action: string
}
type fileUploadStatusType = 'ready' | 'uploading' | 'success' | 'error'
const defaultProp = { action: 'test' }
const Uploader: FC<IProps> = (props) => {
    const defaultProps = MergeProps(defaultProp, props)
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileUploadStatus, setfileUploadStatus] =
        React.useState<fileUploadStatusType>('ready')
    function handleInputChange() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    function handleUploadFile(e: any) {
        const input = e.target
        const files = input.files
        const formData = new FormData()
        formData.append('file', files[0])
        setfileUploadStatus('uploading')
        axios
            .post(defaultProps.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setfileUploadStatus('success')
            })
            .catch((err) => {
                setfileUploadStatus('error')
            })
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={handleInputChange}>
                        <span>
                            {fileUploadStatus === 'ready' && '上传文件'}
                            {fileUploadStatus === 'uploading' && '上传中...'}
                            {fileUploadStatus === 'success' && '上传成功'}
                            {fileUploadStatus === 'error' && '上传失败'}
                        </span>
                    </button>
                </div>
                <div style={{ display: 'none' }}>
                    <input
                        ref={
                            inputRef as LegacyRef<HTMLInputElement> | undefined
                        }
                        type="file"
                        onChange={handleUploadFile}
                    ></input>
                </div>
            </div>
        </>
    )
}

export default memo(Uploader)
