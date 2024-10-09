import { Form, InputNumber, Select } from 'antd'
import React, { FC, useEffect } from 'react'
import Uploader from '../../../../components/Uploader'
import { UploadImgRes } from '../cropper'
import ColorPicker from '../../../../components/ColorPicker'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import CropperCom from '../cropper/index'
import { ChangePagePropsAction } from '../../../../stores/editor'

interface IProps {
    url?: string
}

const PageSetting: FC<IProps> = ({ url }) => {
    const { defaultEditorData } = useAppSelector((state) => state.editorSlice)
    const { props } = defaultEditorData.page
    const dispatch = useAppDispatch()

    const handleUploadSuccess = (data: UploadImgRes) => {
        console.log(data.data.url, '我获取的值为')

        dispatch(
            ChangePagePropsAction({ backgroundImage: `url(${data.data.url})` }),
        )
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
                {url ? (
                    <CropperCom url={url}></CropperCom>
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
