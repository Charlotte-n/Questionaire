import React, { FC, useCallback } from 'react'
import { defaultTemplates } from '../../../../data/defaultTemplates'
import LText from '../../../../components/LText/Component'
import Uploader from '../../../../components/Uploader'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { commonUploadCheck, getImageSize } from './helper'
import { v4 as uuidv4 } from 'uuid'
const ComponentList: FC<{
    onItemClick: (item: any) => void
}> = ({ onItemClick }) => {
    const addImageComponent = useCallback((res: any) => {
        console.log(res)
        const { url } = res.data
        getImageSize(url).then(({ width }) => {
            const maxWidth = 373
            onItemClick({
                name: 'l-image',
                id: uuidv4(),
                props: {
                    url,
                    width: `${width > maxWidth ? maxWidth : width}px`,
                    height: `100%`,
                },
            })
        })
    }, [])

    //添加上传

    return (
        <>
            {defaultTemplates.map((item) => {
                return (
                    <div key={item.id} onClick={() => onItemClick(item)}>
                        <LText {...item}></LText>
                    </div>
                )
            })}
            <Uploader
                action="test"
                beforeUpload={commonUploadCheck}
                showUploadList={false}
                onSuccess={(res) => addImageComponent(res)}
            >
                {{
                    default: (
                        <div>
                            <Button type="primary">
                                <UploadOutlined></UploadOutlined>
                                <span>点击上传</span>
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
        </>
    )
}

export default ComponentList
