import React, { memo, useMemo, useRef, useState } from 'react'
import type { FC, LegacyRef, ReactNode } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { MergeProps } from '../../stores/commonproperties'
import { produce } from 'immer'
import './index.css'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { last } from 'lodash-es'

interface IProps {
    children?: {
        default: ReactNode
        loading: ReactNode
        uploaded: (props: { url: string }) => ReactNode
    }
    action: string
}
type fileUploadStatusType = 'ready' | 'uploading' | 'success' | 'error'
interface FileUploadType {
    uid: string
    name: string
    size: number
    status: string
    raw: File
    response?: any
}

const defaultProp = { action: 'test' }
const Uploader: FC<IProps> = (props) => {
    const { children } = props
    const defaultProps = MergeProps(defaultProp, props)
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploadedFiles, setUploadedFiles] = useState<FileUploadType[]>([])
    let fileObj = useRef<FileUploadType>({
        uid: '',
        name: '',
        size: 0,
        status: 'ready',
        raw: {} as File,
        response: {},
    })
    const isUploading = useMemo(() => {
        return uploadedFiles.some((item) => item.status === 'uploading')
    }, [uploadedFiles])
    function handleInputChange() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    function removeFile(uid: string) {
        setUploadedFiles(
            produce((draft) => {
                const index = draft.findIndex((item) => item.uid === uid)
                draft.splice(index, 1)
            }),
        )
    }
    function handleUploadFile(e: any) {
        const input = e.target
        const files = input.files
        const formData = new FormData()
        const file = files[0]
        formData.append('file', file)
        fileObj.current = {
            uid: uuidv4(),
            name: file.name,
            size: file.size,
            status: 'uploading',
            raw: file,
        }
        setUploadedFiles(
            produce((draft) => {
                draft.push(fileObj.current as FileUploadType)
            }),
        )
        axios
            .post(defaultProps.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                fileObj.current = produce(fileObj.current, (draft) => {
                    draft.status = 'success'
                })
                setUploadedFiles(
                    produce((draft) => {
                        const index = draft.findIndex(
                            (item) => item.uid === fileObj.current!.uid,
                        )
                        draft[index].status = fileObj.current!.status
                        draft[index].response = res.data
                    }),
                )
            })
            .catch((err) => {
                fileObj.current = produce(fileObj.current, (draft) => {
                    draft.status = 'error'
                })
                setUploadedFiles(
                    produce((draft) => {
                        const index = draft.findIndex(
                            (item) => item.uid === fileObj.current!.uid,
                        )
                        console.log(draft)
                        draft[index].status = fileObj.current!.status
                    }),
                )
            })
            .finally(() => {
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            })
    }
    //最后一个状态
    const lastFileData = useMemo(() => {
        const lastFile = last(uploadedFiles)
        if (lastFile) {
            return {
                loaded: lastFile.status === 'success',
                data: lastFile.response,
            }
        }
        return false
    }, [uploadedFiles])

    return (
        <>
            <div>
                <div>
                    <div onClick={handleInputChange}>
                        {/* 默认上传 */}
                        <div>
                            {/* 点击上传 */}
                            {!isUploading ? (
                                //这里进行转换，查看是否为最后一个文件，并且最后一个文件的已经加载完的状态
                                lastFileData && lastFileData.loaded ? (
                                    <div>
                                        {children?.uploaded ? (
                                            children?.uploaded(
                                                lastFileData.data,
                                            )
                                        ) : (
                                            <div>点击上传</div>
                                        )}
                                    </div>
                                ) : (
                                    children?.default || <div>点击上传</div>
                                )
                            ) : (
                                children?.loading || <LoadingOutlined />
                            )}
                        </div>
                    </div>
                    <ul>
                        {uploadedFiles.map((item) => {
                            return (
                                <li
                                    key={item.uid}
                                    className={`uploaded-file uploaded-${item.status}`}
                                >
                                    <span className="mr-[10px]">
                                        {item.name}
                                    </span>
                                    <button
                                        className="delete-icon"
                                        onClick={() => removeFile(item.uid)}
                                    >
                                        <DeleteOutlined></DeleteOutlined>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
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
