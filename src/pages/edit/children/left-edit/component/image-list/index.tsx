import React, { FC, useCallback } from 'react'
import Uploader from '../../../../../../components/Uploader'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { commonUploadCheck, getImageSize } from '../component-list/helper'
import { v4 as uuidv4 } from 'uuid'
import { imageStylePropName } from '../../../../../../stores/commonproperties'
import { defaultImage } from './config'
import LImage from '../../../../../../components/LImage/Component'
import { useAppDispatch, useAppSelector } from '../../../../../../stores'
import { addComponent } from '../../../../../../stores/editor'
import './index.css'

interface IProps { }

const ImageList: FC<IProps> = () => {
    const dispatch = useAppDispatch()
    const { components } = useAppSelector((state) => state.editorSlice)
    const addImageComponent = useCallback((res: any) => {
        const { url } = res.data
        getImageSize(url).then(({ width }) => {
            const maxWidth = 373
            dispatch(
                addComponent({
                    name: 'l-image',
                    id: uuidv4(),
                    props: {
                        ...imageStylePropName,
                        url,
                        width: `${width > maxWidth ? maxWidth : width}px`,
                        height: `100%`,
                    },
                    layerName: '图层' + (components.length + 1),
                }),
            )
        })
    }, [])

    const onItemClick = (item: any) => {
        dispatch(
            addComponent({
                name: 'l-image',
                id: uuidv4(),
                props: {
                    ...imageStylePropName,
                    url: item.url,
                    width: item.width,
                    height: item.height,
                    layerName: '图层' + (components.length + 1),
                },
            }),
        )
    }
    return (
        <div className="w-[100%] px-[20px]  h-[80vh] scroll-hidden">
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
                            <LImage
                                {...item}
                                onItemClick={() => onItemClick(item)}
                            ></LImage>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default ImageList
