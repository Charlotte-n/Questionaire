import React, { memo, useMemo, useRef, useState } from 'react'
import type { FC, LegacyRef, ReactNode } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { MergeProps } from '../../stores/commonproperties'
import { produce } from 'immer'

interface IProps {
    children?: ReactNode
    action: string
}
type fileUploadStatusType = 'ready' | 'uploading' | 'success' | 'error'
interface FileUploadType {
    uid: string
    name: string
    size: number
    status: string
    raw: File
}

const defaultProp = { action: 'test' }
const Uploader: FC<IProps> = (props) => {
    const defaultProps = MergeProps(defaultProp, props)
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploadedFiles, setUploadedFiles] = useState<FileUploadType[]>([])
    const [fileObj, setfileObj] = useState<FileUploadType>({
        uid: uuidv4(),
        name: '',
        size: 0,
        status: 'ready',
        raw: {} as File,
    })
    const isUploading = useMemo(() => {
        return uploadedFiles.some((item) => item.status === 'uploading')
    }, [uploadedFiles])
    function handleInputChange() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    function handleUploadFile(e: any) {
        const input = e.target
        const files = input.files
        const formData = new FormData()
        const file = files[0]
        formData.append('file', file)
        setfileObj(
            produce((draft) => {
                draft.name = file.name
                draft.size = file.size
                draft.status = 'uploading'
                draft.raw = file
            }),
        )
        setUploadedFiles(produce((draft) => draft.push(fileObj)))
        axios
            .post(defaultProps.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setfileObj(produce((draft) => (draft.status = 'success')))
            })
            .catch((err) => {
                setfileObj(produce((draft) => (draft.status = 'error')))
            })
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={handleInputChange} disabled={isUploading}>
                        <span>
                            {isUploading && '上传中...'}
                            {!isUploading && '点击上传'}
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
