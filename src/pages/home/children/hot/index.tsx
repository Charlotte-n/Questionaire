import React, { FC } from 'react'
import SingleTemplate from '../../component/single-template/single-template'
import { useAppSelector } from '../../../../stores'
import { Col, Row } from 'antd'

const Hot: FC = () => {
    const { templates } = useAppSelector((state) => state.templateSlice) as any
    return (
        <Row gutter={[20, 20]} className="w-[100%]">
            {templates.length ?
                templates.map((item: any) => {
                    return (
                        <Col key={item._id} span={6}>
                            <SingleTemplate
                                type="template"
                                baseInfo={{
                                    coverImage: item.coverImg,
                                    author: item.author,
                                    title: item.title,
                                    copiedCount: item.copiedCount,
                                }}
                                id={item.id}
                            ></SingleTemplate>
                        </Col>
                    )
                }) : ''}
        </Row>
    )
}

export default Hot
