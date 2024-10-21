import React, { FC, useCallback } from 'react'
import Uploader from '../../../../../../components/Uploader'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { commonUploadCheck, getImageSize } from '../component-list/helper'
import { v4 as uuidv4 } from 'uuid'
import { imageStylePropName } from '../../../../../../stores/commonproperties'

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
        <div className="w-[100%]">
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
        </div>
    )
}

export default ImageList
