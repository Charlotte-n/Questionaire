import React, { FC, memo, useEffect, useState } from 'react'
import Input from 'antd/es/input/Input'
import { Layout, Row, Tabs, Col, Pagination, Spin } from 'antd'
import SingleTemplate from '../home/component/single-template/single-template'
import { useLoadMore } from '../../hooks/useLoadMore'
import { useAppDispatch, useAppSelector } from '../../stores'
import { fetchMyWorkOrTemplate } from '../../stores/templates'

const Work: React.FC<{
    type: string
}> = ({ type }) => {
    const dispatch = useAppDispatch()
    const { total, templates } = useAppSelector((state) => state.templateSlice)
    const pageSize = 8
    const { opName } = useAppSelector((state) => state.globalSlice)

    const getMyListApi = async () => {
        const params = {
            pageSize,
            pageIndex: 0,
            isTemplate: type === 'myWork' ? 0 : 1,
        }
        dispatch(fetchMyWorkOrTemplate(params))
    }
    const { gotoPage } = useLoadMore(fetchMyWorkOrTemplate, total, {
        pageSize,
        pageIndex: 0,
        isTemplate: type === 'myWork' ? 0 : 1,
    })
    //获取作品
    useEffect(() => {
        getMyListApi()
    }, [type])

    return (
        <div className="">
            <Spin spinning={opName['getMyList']}>
                <Row gutter={[20, 20]}>
                    {templates?.map((item: any) => {
                        return (
                            <Col key={item._id} span={6}>
                                <SingleTemplate
                                    type="myWork"
                                    id={item.id}
                                    baseInfo={{
                                        coverImage: item.coverImg,
                                        author: item.author,
                                        title: item.title,
                                        copiedCount: item.copiedCount,
                                    }}
                                    getMyWorkList={getMyListApi}
                                ></SingleTemplate>
                            </Col>
                        )
                    })}
                </Row>
            </Spin>

            {total !== 0 && (
                <Row className="mt-[15px]">
                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={8}
                        total={total}
                        onChange={(e) => gotoPage(e - 1)}
                    ></Pagination>
                </Row>
            )}
        </div>
    )
}
const TabsItems = [
    {
        label: '我的作品',
        key: '1',
        children: <Work type="myWork" key="myWork"></Work>,
        destroyInactiveTabPane: true,
    },
    {
        label: '我的模板',
        key: '2',
        children: <Work type="myTemplate" key="myTemplate" />,
        destroyInactiveTabPane: true,
    },
]

const MyWorks: FC = () => {
    const [activeKey, setActiveKey] = useState('1')

    const handleTabChange = (key: string) => {
        setActiveKey(key)
    }

    return (
        <div className="flex justify-center px-[50px] py-[15px]">
            <Layout.Content className="max-w-[1200px]">
                <div className="font-medium text-[20px] flex justify-between">
                    <div>我的作品和模板</div>
                    <div>
                        <Input placeholder="搜索"></Input>
                    </div>
                </div>
                <div>
                    <Tabs
                        items={TabsItems}
                        activeKey={activeKey}
                        onChange={handleTabChange}
                    ></Tabs>
                </div>
            </Layout.Content>
        </div>
    )
}

export default MyWorks
