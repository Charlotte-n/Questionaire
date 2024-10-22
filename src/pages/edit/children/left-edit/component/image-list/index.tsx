import React, { FC, useCallback } from 'react'
import Uploader from '../../../../../../components/Uploader'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { commonUploadCheck, getImageSize } from '../component-list/helper'
import { v4 as uuidv4 } from 'uuid'
import { imageStylePropName } from '../../../../../../stores/commonproperties'
import { Images } from '../../config'
import { defaultImage } from './config'
import LImage from '../../../../../../components/LImage/Component'

interface IProps {
    onItemClick: (item: any) => void
}

const ImageList: FC<IProps> = ({ onItemClick }) => {
    const addImageComponent = useCallback((res: any) => {
        const { url } = res.data
        getImageSize(url).then(({ width }) => {
            const maxWidth = 373
            onItemClick({
                name: 'l-image',
                id: uuidv4(),
                props: {
                    ...imageStylePropName,
                    url,
                    width: `${width > maxWidth ? maxWidth : width}px`,
                    height: `100%`,
                },
            })
        })
    }, [])
    return (
        <div className="w-[100%] px-[20px]">
            <Row className="w-[100%] flex">
                <Uploader
                    action="https://egg.hk.merikle.top/api/utils/uploadImgOSS"
                    beforeUpload={commonUploadCheck}
                    showUploadList={false}
                    onSuccess={(res) => addImageComponent(res)}
                >
                    {{
                        default: (
                            <div>
                                <Button type="primary" className="w-[100%]">
                                    <UploadOutlined></UploadOutlined>
                                    <span>上传图片</span>
                                </Button>
                            </div>
                        ),
                        loading: (
                            <div>
                                <LoadingOutlined></LoadingOutlined>
                            </div>
                        ),
                        uploaded: (prop) => (
                            <div>
                                <div>重新上传</div>
                                <img src={prop.url} />
                            </div>
                        ),
                    }}
                </Uploader>
            </Row>

            <Row gutter={[10, 10]} className="mt-[15px] flex justify-center">
                {defaultImage.map((item) => {
                    return (
                        <Col key={item.id}>
                            <LImage {...item}></LImage>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default ImageList
