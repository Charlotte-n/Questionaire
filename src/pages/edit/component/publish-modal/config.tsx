import { Button, Divider, Input, message } from 'antd'
import {
    createChannel,
    deleteChannel,
    publishTemplate,
} from '../../../../apis/work/work'
import { useParams } from 'react-router-dom'
import { FC, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import { getChannelListAsync } from '../../../../stores/editor'
import QRCode from 'qrcode'
import { BaseUrl } from '../../../../constances'
import ClipboardJS from 'clipboard'

const TabContent: FC<{
    isWork: boolean
}> = ({ isWork = true }) => {
    const { id } = useParams()
    const [channelName, setChannelName] = useState('')
    const { channels, page } = useAppSelector((state) => state.editorSlice)
    const dispatch = useAppDispatch()
    const { opName } = useAppSelector((state) => state.globalSlice)

    const generateQRCode = useMemo(
        () => (isTemplate: boolean, channelId?: string) => {
            if (isTemplate) return `${BaseUrl}/p/${id}-${page.uuid}`
            return `${BaseUrl}/p/${id}-${page.uuid}?channels=${channelId}`
        },
        [id],
    )
    const createChannelApi = async () => {
        //展示到页面上
        try {
            const res = await createChannel({
                workId: id as string,
                name: channelName,
            })
            if (res.code === 0) {
                dispatch(getChannelListAsync(id as string))
            }
        } catch (e) {
            console.error(e)
        }
    }

    const deleteChannelApi = async (deleteId: string) => {
        try {
            const res = await deleteChannel(deleteId)
            if (res.code === 0) {
                dispatch(getChannelListAsync(id as string))
            }
        } catch (e) {
            console.error(e)
        }
    }

    const publishTemplateApi = async () => {
        try {
            const res = await publishTemplate(id as string)
            if (res.code === 0) {
                message.success('发布成功')
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        //生成二维码
        channels?.forEach((item) => {
            QRCode.toCanvas(
                document.getElementById(
                    `qrcode-${item.id}`,
                ) as HTMLCanvasElement,
                `http://localhost:3000/edit/${item.id}`,
                {
                    errorCorrectionLevel: 'H',
                    width: 80,
                },
            )
        })
    }, [channels])

    useEffect(() => {
        const clipboard = new ClipboardJS('.copy-btn')
        clipboard.on('success', function (e) {
            e.clearSelection()
            message.success('复制成功')
        })
    }, [])

    return (
        <div className="flex flex-col justify-between w-[100%] h-[100%]">
            <div>
                {/* 渠道内容 */}
                {isWork ? (
                    <div>
                        {channels?.map((item) => {
                            return (
                                <div className="flex w-[100%]" key={item.id}>
                                    {/* 二维码 */}
                                    <div className="w-[30%] mr-[10px]">
                                        <canvas
                                            id={`qrcode-${item.id}`}
                                        ></canvas>
                                    </div>
                                    <div className="flex-1 mb-[20px] ">
                                        <div className="flex justify-end mb-[10px]">
                                            <Button
                                                className="rounded-full"
                                                size="small"
                                                onClick={() =>
                                                    deleteChannelApi(item.id)
                                                }
                                                color="danger"
                                                disabled={channels.length === 1}
                                            >
                                                删除渠道
                                            </Button>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {item.name ? '默认' : item.name}
                                            </div>
                                            <div className="flex items-center">
                                                <Input
                                                    className="mr-[5px] rounded-full"
                                                    value={generateQRCode(
                                                        false,
                                                        item.id,
                                                    )}
                                                    id={`btn-${item.id}`}
                                                ></Input>
                                                <Button
                                                    size="middle"
                                                    className="rounded-full copy-btn"
                                                    data-clipboard-target={`#btn-${item.id}`}
                                                >
                                                    复制
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex w-[100%]">
                        {/* 二维码 */}
                        <div className="w-[30%]">
                            <img src="" alt="二维码" />
                        </div>
                        <div className="flex-1 flex-col mb-[20px] ">
                            <div className="font-bold mb-[5px]">模板信息</div>
                            <div className="flex items-center">
                                <Input
                                    className="mr-[5px] rounded-full"
                                    id="template-info"
                                    value={generateQRCode(true)}
                                ></Input>
                                <Button
                                    size="middle"
                                    className="rounded-full copy-btn"
                                    data-clipboard-target="#template-info"
                                >
                                    复制
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Divider></Divider>
            {isWork ? (
                <div className="flex pt-[20px]">
                    <Input
                        placeholder="渠道名称"
                        className="mr-[5px] rounded-full"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    ></Input>
                    <Button
                        className="rounded-full"
                        type="primary"
                        onClick={createChannelApi}
                    >
                        创建新渠道
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={publishTemplateApi}
                    type="primary"
                    className=" rounded-full self-center"
                    loading={opName['publishTemplate']}
                >
                    发布模板
                </Button>
            )}
        </div>
    )
}

export const TabItems = [
    {
        key: 'work',
        label: '发布为作品',
        children: <TabContent isWork={true} />,
    },
    {
        key: 'template',
        label: '发布为模板',
        children: <TabContent isWork={false} />,
    },
]
