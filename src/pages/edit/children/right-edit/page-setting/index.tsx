import { Form, InputNumber, message, Select } from 'antd'
import React, { FC, useEffect, useMemo } from 'react'
import Uploader from '../../../../../components/Uploader'
import { UploadImgRes } from '../cropper'
import ColorPicker from '../../../../../components/ColorPicker'
import { useAppDispatch, useAppSelector } from '../../../../../stores'
import CropperCom from '../cropper/index'
import { ChangePagePropsAction } from '../../../../../stores/editor'

interface IProps {
    url?: string
}

const PageSetting: FC<IProps> = () => {
    const { page } = useAppSelector((state) => state.editorSlice)

    const { props } = page
    const dispatch = useAppDispatch()

    //看这个正则表达式
    const urlProcess = useMemo(() => {
        if (!page.props.backgroundImage) return ''
        const reg = /url\((.*?)\)/
        const matches = reg.exec(page.props.backgroundImage)
        if (matches && matches.length > 1) {
            return matches[1]
        }
    }, [page.props.backgroundImage])

    const handleUploadSuccess = (data: UploadImgRes) => {
        const img = new Image()
        img.src = data.data.url
        img.onload = () => {
            // 获取图片的原始宽度和高度
            const originalWidth = img.width
            const originalHeight = img.height
            // 计算按比例缩放后的渲染高度
            const renderHeight = (350 / originalWidth) * originalHeight
            dispatch(
                ChangePagePropsAction({
                    backgroundImage: `url(${data.data.url})`,
                    height: renderHeight + 'px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    type: 'props',
                }),
            )
            dispatch(
                ChangePagePropsAction({
                    coverImg: data.data.url,
                    type: 'root',
                }),
            )
        }

        img.onerror = () => {
            console.error('图片加载失败')
            // 处理图片加载失败的情况
            message.error('图片加载失败')
        }
    }

    const handleChange = (value: any) => {
        dispatch(ChangePagePropsAction(value))
    }
    return (
        <Form
            className="px-[20px]"
            initialValues={props}
            onValuesChange={handleChange}
        >
            <Form.Item label="背景颜色" name="backgroundColor">
                <ColorPicker></ColorPicker>
            </Form.Item>
            <Form.Item>
                {urlProcess ? (
                    <CropperCom
                        url={urlProcess}
                        onSuccess={handleUploadSuccess}
                    ></CropperCom>
                ) : (
                    <Uploader
                        action="https://egg.hk.merikle.top/api/utils/uploadImgOSS"
                        onSuccess={handleUploadSuccess}
                    >
                        {{
                            default: (
                                <div className="py-[90px] px-[90px] border-[1px] border-dashed">
                                    上传背景图片
                                </div>
                            ),
                        }}
                    </Uploader>
                )}
            </Form.Item>
            <Form.Item label="背景重复" name="backgroundRepeat">
                <Select></Select>
            </Form.Item>
            <Form.Item label="背景大小" name="backgroundSize">
                <Select></Select>
            </Form.Item>
            <Form.Item label="高度" name="height" wrapperCol={{ span: 13 }}>
                <InputNumber className=""></InputNumber>
            </Form.Item>
        </Form>
    )
}

export default PageSetting
