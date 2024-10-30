import { Avatar, Button, Col, Layout, Row } from 'antd'
import React, { FC, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import { copyWork, getSingleTemplate } from '../../apis/work/work'
import { useNavigate, useParams } from 'react-router-dom'
import { TemplateType } from '../../apis/work/interface'
import QRCode from 'qrcode'
import { BaseH5Url } from '../../constances'
import { downloadImage } from '../utils/util'

const Template: FC = () => {
    const { id } = useParams()
    const [template, setTemplate] = useState<TemplateType>()
    const navigation = useNavigate()

    //创建二维码
    const qrcodeUrl = useMemo(() => {
        return `${BaseH5Url}/api/pages/p/${id}-${template?.uuid}`
    }, [template])

    useLayoutEffect(() => {
        const qrcodeElement = document.getElementById('template-canvas')
        if (qrcodeElement) {
            QRCode.toCanvas(qrcodeElement, qrcodeUrl, { width: 150 })
        }
    }, [])

    const getTemplateApi = async () => {
        const res = await getSingleTemplate(id as string)
        setTemplate(res.data)
    }

    const handleGoToTemplate = async () => {
        const res = await copyWork(id as string)
        navigation(`/gxt/edit/${res.data.id}`)
    }

    useEffect(() => {
        getTemplateApi()
    }, [])
    return (
        <Layout.Content className="flex justify-center  h-[85vh]">
            <Row className="max-w-[1200px] h-[500px] mt-[30px]" gutter={30}>
                <Col span={10}>
                    <img
                        src={template?.coverImg}
                        alt="图片"
                        className="h-[100%]"
                    />
                </Col>
                <Col className="flex flex-col">
                    <div className="font-bold text-[20px] mb-[10px]">
                        {template?.title}
                    </div>
                    <div className="mb-[10px]">
                        {template?.subTitle ? template.subTitle : '未命名作品'}
                    </div>
                    <div className="mb-[30px]">
                        <Avatar className="mr-[10px]" />
                        该模板由 {template?.author} 创作
                    </div>
                    <div className="mb-[20px]">
                        <div className="mb-[3px]">扫一扫，手机预览</div>
                        <div>
                            <canvas id="template-canvas"></canvas>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            className="mr-[15px] rounded-full"
                            onClick={handleGoToTemplate}
                        >
                            使用模板
                        </Button>
                        <Button
                            className="rounded-full"
                            onClick={() =>
                                downloadImage(template!.coverImg as string)
                            }
                        >
                            下载图片海报
                        </Button>
                    </div>
                </Col>
            </Row>
        </Layout.Content>
    )
}

export default Template
