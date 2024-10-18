import { Button, Card } from 'antd'
import React, { FC } from 'react'
import Ellipsis from '../../../../components/Ellipsis/ellipsis'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { copyWork } from '../../../../apis/work/work'

interface Props {
    baseInfo: {
        coverImage: string
        author: string
        title: string
        copiedCount: number
    }
    id: number
}

const SingleTemplate: FC<Props> = (props) => {
    const { copiedCount, coverImage, author, title } = props.baseInfo
    const { id } = props
    const navigate = useNavigate()

    const handleGoToTemplate = async (id: string) => {
        const res = await copyWork(id)
        navigate(`/gxt/edit/${res.data.id}`)
    }

    return (
        <div className="rounded-md w-[20vw] h-[35vh] bg-[#fdfdfd] border-[1px] border-solid">
            <div className="hover-container">
                <img src={coverImage} className="w-[100%] h-[100%]" />
                <div className="hover-item">
                    <Button
                        type="primary"
                        size="large"
                        className="rounded-full"
                        onClick={() => handleGoToTemplate(JSON.stringify(id))}
                    >
                        使用此模板创建
                    </Button>
                </div>
            </div>
            <div>
                <h2 className="px-[10px] py-[10px] border-b-[1px] border-solid">
                    {title}
                </h2>
                <div className="px-[10px] py-[20px] flex justify-between text-[15px]">
                    <div className="flex">
                        <span>作者:</span>
                        {/* 写一个省略号的组件 */}
                        <Ellipsis
                            style={{
                                width: '80px',
                                display: 'block',
                            }}
                            text={author}
                        ></Ellipsis>
                    </div>
                    <div>{copiedCount}</div>
                </div>
            </div>
        </div>
    )
}

export default SingleTemplate
