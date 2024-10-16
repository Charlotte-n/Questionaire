import React, { FC, useEffect, useState } from 'react'
import SingleTemplate from '../../component/single-template/single-template'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import { fetchTemplatesAsync } from '../../../../stores/templates'
import { produce } from 'immer'
import { Col, Row } from 'antd'

const Hot: FC = () => {
    const dispatch = useAppDispatch()
    const { templates } = useAppSelector((state) => state.templateSlice) as any

    //获取当前用户
    useEffect(() => {
        dispatch(fetchTemplatesAsync({ pageSize: 10, pageIndex: 0 }))
    }, [])

    useEffect(() => {
        if (templates.length) {
            const firstTemplate = templates[0]
            console.log(templates)
        }
    }, [templates])
    return (
        <Row gutter={16}>
            {templates.length &&
                templates.map((item: any) => {
                    return (
                        <Col key={item._id} span={5}>
                            <SingleTemplate
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
                })}
        </Row>
    )
}

export default Hot
