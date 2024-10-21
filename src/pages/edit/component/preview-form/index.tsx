import { Button, Drawer, Form, Input, message } from 'antd'
import React, {
    memo,
    useEffect,
    useMemo,
    useLayoutEffect,
    useState,
} from 'react'
import type { FC, ReactNode } from 'react'
import QRCode from 'qrcode'
import { useAppSelector } from '../../../../stores'
import { BaseUrl } from '../../../../constances'
import { useParams } from 'react-router-dom'
import Uploader from '../../../../components/Uploader'
import './index.css'
import { produce } from 'immer'
import { updateName } from '../../../../apis/work/work'
import { usePublish } from '../header/hooks/usePublish'

interface IProps {
    children?: ReactNode
    drawerVisible: boolean
    onClose: () => void
}

type FieldType = {
    title: string
    subTitle: string
}
const PreviewForm: FC<IProps> = ({ drawerVisible, onClose }) => {
    const { page } = useAppSelector((state) => state.editorSlice)
    const { id } = useParams()
    const [form] = Form.useForm()
    const [formData, setFormData] = useState({
        title: '',
        subTitle: '',
    })
    const { publish } = usePublish()

    //创建二维码
    const qrcodeUrl = useMemo(() => {
        return `${BaseUrl}/api/pages/p/${id}-${page.uuid}`
    }, [page])

    useLayoutEffect(() => {
        const qrcodeElement = document.getElementById('preview-qrcode')
        if (qrcodeElement) {
            QRCode.toCanvas(qrcodeElement, qrcodeUrl, { width: 150 })
        }
    }, [drawerVisible])

    const handleCancel = () => {
        onClose()
    }

    const handleSave = () => {
        try {
            form.validateFields()
            if (
                page.title !== formData.title ||
                page.subTitle !== formData.subTitle
            ) {
                updateName(id as string, {
                    title: formData.title,
                    subTitle: formData.subTitle,
                })
            }
            message.success('保存成功')
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    const handlePublish = () => {
        publish()
        onClose()
    }

    useEffect(() => {
        setFormData(
            produce((draft) => {
                draft.title = page.title
                draft.subTitle = page.subTitle
            }),
        )
    }, [page, drawerVisible])

    useEffect(() => {
        form.setFieldsValue(formData)
    }, [formData])

    return (
        <div className="">
            {drawerVisible && (
                <div className="final-preview">
                    <div className="final-inner">
                        <div className="title text-center font-[30px] leading-8">
                            {page.title}
                        </div>
                        <div className="bg-[red] leading-10 text-white text-center font-bold text-[16px]">
                            仅供预览，请发布作品后，再正式使用
                        </div>
                        {/* iframe */}
                        <div>
                            <iframe
                                src={qrcodeUrl}
                                width="375"
                                height={page.props.height}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <Drawer
                title="设置面板"
                open={drawerVisible}
                onClose={onClose}
                closable
                width={400}
                placement="right"
                destroyOnClose
            >
                <Form form={form} initialValues={formData}>
                    <Form.Item label="扫码预览">
                        {/* 二维码 */}
                        <div className=" border-[1px] border-dashed  inline-block">
                            <canvas id="preview-qrcode"></canvas>
                        </div>
                    </Form.Item>
                    <Form.Item label="上传封面">
                        {/* 上传组件 */}
                        <Uploader action="https://egg.hk.merikle.top/api/utils/uploadImgOSS"></Uploader>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="标题"
                        labelCol={{ span: 5 }}
                        labelAlign="left"
                        name={'title'}
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ]}
                    >
                        {/* input */}
                        <Input
                            className="rounded-full"
                            placeholder="请输入标题"
                            defaultValue={formData.title}
                            onChange={(e) => {
                                setFormData(
                                    produce((draft) => {
                                        draft.title = e.target.value
                                    }),
                                )
                            }}
                        ></Input>
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="副标题"
                        name={'subTitle'}
                        labelCol={{ span: 5 }}
                        labelAlign="left"
                        rules={[
                            {
                                required: true,
                                message: '请输入副标题',
                            },
                        ]}
                    >
                        {/* input */}
                        <Input
                            className="rounded-full"
                            placeholder="请输入副标题"
                            value={formData.subTitle}
                            onChange={(e) =>
                                setFormData(
                                    produce((draft) => {
                                        draft.subTitle = e.target.value
                                    }),
                                )
                            }
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="rounded-full mr-[5px]"
                            type="primary"
                            onClick={handlePublish}
                        >
                            发布
                        </Button>
                        <Button
                            className="rounded-full mr-[5px]"
                            onClick={handleSave}
                        >
                            保存
                        </Button>
                        <Button
                            className="
                            rounded-full
                            mr-[5px]
                        "
                            onClick={handleCancel}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default memo(PreviewForm)
