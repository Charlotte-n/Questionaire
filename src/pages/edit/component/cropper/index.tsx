import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import Modal from 'antd/es/modal/Modal'
import Cropper from 'cropperjs'
import Uploader from '../../../../components/Uploader'
import { Button } from 'antd'
import 'cropperjs/dist/cropper.css'

export interface UploadImgRes {
    code: number
    message: string
    data: {
        name: string
        url: string
    }
}

interface IProps {
    children?: ReactNode
    url: string
}

interface CropperDataType {
    x: number
    y: number
    width: number
    height: number
}

const CropperCom: FC<IProps> = ({ url }) => {
    //裁剪图片
    const [isCopperOpen, setIsCopperOpen] = useState(false)
    //图片上传成功获取到图片
    const [uploadImg, setUploadImg] = useState(url || '')
    const handleUploadSuccess = (res: UploadImgRes) => {
        setUploadImg(res.data.url)
    }
    const imgRef = useRef<HTMLImageElement | null>(null)
    let cropper: Cropper
    let CropperData: CropperDataType = {} as CropperDataType
    const handleOk = () => {
        setUploadImg((prevVal) => {
            const { x, y, width, height } = CropperData as CropperDataType
            if (Object.keys(CropperData).length > 0) {
                const baseImageUrl = prevVal.split('?')[0]
                return (
                    baseImageUrl +
                    `?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height}`
                )
            }
            return prevVal
        })
        setIsCopperOpen(false)
    }
    const handleCancel = () => {
        setIsCopperOpen(false)
    }
    const showCopperModal = () => {
        setIsCopperOpen(true)
    }

    useEffect(() => {
        if (imgRef.current) {
            cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 16 / 9,
                crop(event) {
                    const { x, y, width, height } = event.detail
                    CropperData = {
                        x: Math.floor(x),
                        y: Math.floor(y),
                        width: Math.floor(width),
                        height: Math.floor(height),
                    }
                },
            })
        }
        return () => {
            if (cropper) {
                cropper.destroy()
            }
        }
    }, [isCopperOpen])

    return (
        <div>
            {/* 裁剪部分 */}
            <Modal
                title="裁剪图片"
                open={isCopperOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <div>
                    <img
                        ref={imgRef}
                        id="image"
                        src={uploadImg}
                        className="block max-w-[100%]"
                    />
                </div>
            </Modal>
            <div className="flex">
                {/* 预览 */}
                {uploadImg !== '' ? (
                    <div>
                        <img
                            src={uploadImg}
                            className="w-[100%] h-[100%] rounded-md"
                        />
                    </div>
                ) : null}

                <div className="flex justify-center items-center flex-col ml-[20px]">
                    <Button onClick={showCopperModal} className="mb-[10px]">
                        裁剪图片
                    </Button>
                    <Uploader
                        action="https://egg.hk.merikle.top/api/utils/uploadImgOSS"
                        onSuccess={handleUploadSuccess}
                    >
                        {{
                            default: <Button>更换上传</Button>,
                        }}
                    </Uploader>
                </div>
            </div>
        </div>
    )
}

export default memo(CropperCom)
