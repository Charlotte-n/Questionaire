import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import type { FC, LegacyRef, ReactNode, Ref, RefObject } from 'react'
import axios, { AxiosProgressEvent, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { MergeProps } from '../../stores/commonproperties'
import { produce } from 'immer'
import './index.css'
import {
    DeleteOutlined,
    LoadingOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { last } from 'lodash-es'
import { Button, Progress } from 'antd'
import { UploadImgRes } from '../../pages/edit/children/right-edit/cropper'

interface IProps {
    children?: {
        default?: any
        loading?: ReactNode
        uploaded?: (props: { url: string }) => ReactNode
    }
    action: string
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (event: AxiosProgressEvent) => void
    onSuccess?: (data: UploadImgRes) => void
    onError?: (error: any) => void
    onChange?: (file: File) => void
    onRemove?: (file: File) => void
    headers?: Record<string, string>
    withCredentials?: boolean
    accept?: string
    multiple?: boolean
    draggable?: boolean
    cover?: boolean
    showUploadList?: boolean
}
type fileUploadStatusType = 'ready' | 'uploading' | 'success' | 'error'
interface FileUploadType {
    uid: string
    name: string
    size: number
    status: string
    raw: File
    response?: any
    progress: number
    isUploading: boolean
}

interface lastFileType {
    status: string
    loaded: boolean
    data: any
    progress: number
}

const defaultProp = {
    action: 'test',
    draggable: false,
    cover: true,
    showUploadList: false,
}
const Uploader: FC<IProps> = (props) => {
    const { children } = props
    const defaultProps = MergeProps(defaultProp, props)
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploadedFiles, setUploadedFiles] = useState<FileUploadType[]>([])
    const [isDragOver, setDragOver] = useState(false)
    let fileObj = useRef<FileUploadType>({
        uid: '',
        name: '',
        size: 0,
        status: 'ready',
        raw: {} as File,
        response: {},
        progress: 0,
        isUploading: false,
    })

    //点击上传之后有uploading状态
    const isUploading = useMemo(() => {
        return uploadedFiles.some((item) => item.status === 'uploading')
    }, [fileObj, uploadedFiles])

    const handleInputChange = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const removeFile = (uid: string) => {
        const file = uploadedFiles.find((item) => item.uid === uid)?.raw
        file && props.onRemove && props.onRemove(file)
        setUploadedFiles(
            produce((draft) => {
                const index = draft.findIndex((item) => item.uid === uid)
                draft.splice(index, 1)
            }),
        )
    }

    const postFile = useCallback((files: FileList) => {
        const formData = new FormData()
        const file = files[0]
        formData.append('file', file)
        fileObj.current = {
            uid: uuidv4(),
            name: file.name,
            size: file.size,
            status: 'uploading',
            raw: file,
            progress: 0,
            isUploading: true,
        }
        setUploadedFiles(
            produce((draft) => {
                if (draft.length > 0 && defaultProp.cover) {
                    draft.splice(0, draft.length)
                }
                draft.push(fileObj.current as FileUploadType)
            }),
        )

        props.onChange && props.onChange(file)
        axios
            .post<UploadImgRes>(defaultProps.action, formData, {
                withCredentials: props.withCredentials
                    ? props.withCredentials
                    : false,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...props.headers,
                },
                onUploadProgress(progressEvent) {
                    props.onProgress && props.onProgress(progressEvent)
                    if (progressEvent.lengthComputable) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) /
                                (progressEvent.total as number),
                        )
                        setUploadedFiles(
                            produce((draft) => {
                                const index = draft.findIndex(
                                    (item) => item.uid === fileObj.current!.uid,
                                )
                                draft[index].progress = percentCompleted
                            }),
                        )
                    }
                },
            })
            .then((res) => {
                props.onSuccess && props.onSuccess(res.data)
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
                        draft[index].progress = 100
                        draft[index].isUploading = false
                    }),
                )
            })
            .catch((err) => {
                props.onError && props.onError(err)
                fileObj.current = produce(fileObj.current, (draft) => {
                    draft.status = 'error'
                })
                setUploadedFiles(
                    produce((draft) => {
                        const index = draft.findIndex(
                            (item) => item.uid === fileObj.current!.uid,
                        )
                        draft[index].status = fileObj.current!.status
                        draft[index].isUploading = false
                    }),
                )
            })
            .finally(() => {
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            })
    }, [])

    const postFiles = useCallback((files: FileList) => {
        if (files) {
            if (props.beforeUpload) {
                const result = props.beforeUpload(files[0])
                if (result && result instanceof Promise) {
                    result
                        .then((res) => {
                            if (res instanceof File) {
                                postFile(files)
                            } else {
                                throw new Error(
                                    'beforeUpload return type error',
                                )
                            }
                        })
                        .catch((e) => {
                            console.error(e)
                        })
                } else if (result === true) {
                    postFile(files)
                }
            } else {
                postFile(files)
            }
        }
    }, [])

    const handleUploadFile = (e: any) => {
        const input = e.target
        const files = input.files
        postFiles(files)
    }

    //最后一个状态
    const lastFileData = useMemo(() => {
        const lastFile = last(uploadedFiles)
        if (lastFile) {
            return {
                loaded: lastFile.status === 'success',
                data: lastFile.response,
                status: lastFile.status,
                progress: lastFile.progress,
            }
        }
        return false
    }, [uploadedFiles])

    const handleDragOver = (e: DragEvent, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    const handleDropOver = (e: DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        //寻找存储的文件
        if (e.dataTransfer) {
            postFiles(e.dataTransfer.files)
        }
    }

    return (
        <>
            <div className="flex w-[100%]">
                <div className="w-[100%]">
                    <div
                        className={`is-dragover ${isDragOver ? 'drag' : ''} w-[100%]`}
                        draggable={false}
                        onClick={handleInputChange}
                        onDragOver={(e) => handleDragOver(e as any, true)}
                        onDrop={(e) => handleDropOver(e as any)}
                        onDragLeave={(e) => handleDragOver(e as any, false)}
                    >
                        {/* 默认上传 */}
                        <div>
                            {isUploading ? (
                                children?.loading ? (
                                    children.loading
                                ) : (
                                    <LoadingOutlined></LoadingOutlined>
                                )
                            ) : lastFileData && lastFileData.loaded ? (
                                <div>
                                    {children?.uploaded ? (
                                        children?.uploaded(lastFileData.data)
                                    ) : (
                                        <Button>点击上传</Button>
                                    )}
                                </div>
                            ) : (
                                children?.default || <Button>点击上传</Button>
                            )}
                        </div>
                    </div>
                    {defaultProp.showUploadList && (
                        <ul>
                            {uploadedFiles.map((item) => {
                                return (
                                    <li
                                        key={item.uid}
                                        className={`uploaded-file uploaded-${item.status}`}
                                    >
                                        <div>
                                            <span className="mr-[10px]">
                                                {item.name}
                                            </span>
                                            {!item.isUploading && (
                                                <button
                                                    className="delete-icon"
                                                    onClick={() =>
                                                        removeFile(item.uid)
                                                    }
                                                >
                                                    <DeleteOutlined></DeleteOutlined>
                                                </button>
                                            )}
                                        </div>
                                        {item.isUploading && (
                                            <div className="flex">
                                                <span className="mr-[5px]">
                                                    <LoadingOutlined></LoadingOutlined>
                                                </span>
                                                <Progress
                                                    percent={item.progress}
                                                    status={
                                                        item.status ===
                                                        'uploading'
                                                            ? 'active'
                                                            : item.status ===
                                                                'success'
                                                              ? 'success'
                                                              : 'exception'
                                                    }
                                                ></Progress>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <div style={{ display: 'none' }}>
                    <input
                        ref={
                            inputRef as LegacyRef<HTMLInputElement> | undefined
                        }
                        type="file"
                        onChange={handleUploadFile}
                        accept={props.accept ? props.accept : '*'}
                        multiple={props.multiple ? props.multiple : false}
                    ></input>
                </div>
            </div>
        </>
    )
}

export default memo(Uploader)
