import {
    Button,
    Card,
    Dropdown,
    Typography,
    Space,
    MenuProps,
    message,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { FC } from 'react'
import Ellipsis from '../../../../components/Ellipsis/ellipsis'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { copyWork, deleteMyWork } from '../../../../apis/work/work'
import { downloadImage } from '../../../utils/util'

interface Props {
    baseInfo: {
        coverImage: string
        author: string
        title: string
        copiedCount: number
    }
    id: string
    type: string
    getMyWorkList?: () => void
}

const menuList = [
    {
        label: '编辑',
        key: 'edit',
    },
    {
        label: '删除',
        key: 'delete',
    },
    {
        label: '复制',
        key: 'copy',
    },
    {
        label: '下载图片',
        key: 'download',
    },
]
const SingleTemplate: FC<Props> = (props) => {
    const { copiedCount, coverImage, author, title } = props.baseInfo
    const { id, type } = props
    const navigate = useNavigate()

    const handleGoToTemplate = async () => {
        navigate(`/gxt/template/${id}`)
    }

    // 编辑该作品
    const handleGoToEditMyWork = async () => {
        navigate(`/gxt/edit/${id}`)
    }

    // 删除该作品
    const handleDeleteMyWork = async () => {
        try {
            deleteMyWork(id)
            message.success('删除成功')
            //重新获取数据
            props.getMyWorkList && props.getMyWorkList()
        } catch (e) {}
    }

    //复制
    const handleCopyMyWork = async () => {
        try {
            await copyWork(id)
            message.success('复制成功')
            props.getMyWorkList && props.getMyWorkList()
        } catch (e) {}
    }

    //下载海报
    const handleDownloadImage = async (img: string) => {
        downloadImage(img)
    }

    const handleClickMenu: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'edit':
                handleGoToEditMyWork()
                break
            case 'delete':
                handleDeleteMyWork()
                break
            case 'copy':
                handleCopyMyWork()
                break
            case 'download':
                handleDownloadImage(coverImage)
                break
            default:
                break
        }
    }

    return (
        <div className="rounded-md  bg-[#fdfdfd]  h-[100%]">
            <div className="hover-container overflow-hidden">
                <img
                    src={coverImage}
                    className="w-[100%] h-[100%] single-template-img"
                    alt="目前还没有上传封面请快点上传吧"
                />
                <div className="hover-item">
                    {type === 'myWork' ? (
                        <Button
                            className="rounded-full"
                            type="primary"
                            onClick={handleGoToEditMyWork}
                        >
                            继续编辑该作品
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            size="large"
                            className="rounded-full"
                            onClick={() => handleGoToTemplate()}
                        >
                            使用此模板创建
                        </Button>
                    )}
                </div>
            </div>
            <div className="border-[1px] border-solid">
                <h2 className="px-[10px] py-[10px] border-b-[1px] border-solid">
                    {title}
                </h2>
                {type === 'myWork' || type === 'myTemplate' ? (
                    <div className="flex justify-between px-[10px] py-[10px]">
                        <div className="cursor-pointer">编辑</div>
                        <div>
                            <Dropdown
                                menu={{
                                    items: menuList,
                                    onClick: handleClickMenu,
                                }}
                            >
                                <Typography.Link>
                                    <Space>
                                        选择
                                        <DownOutlined />
                                    </Space>
                                </Typography.Link>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    )
}

export default SingleTemplate
