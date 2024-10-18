import { Button, Divider, Input } from 'antd'

const TabContent = () => {
    return (
        <div className="flex flex-col justify-between w-[100%] h-[100%]">
            <div className="flex w-[100%]">
                {/* 二维码 */}
                <div className="w-[30%]">
                    <img src="" alt="二维码" />
                </div>
                {/* 渠道内容 */}
                <div className="flex-1">
                    <div className="flex justify-end">
                        <Button className="rounded-full" size="small">
                            删除渠道
                        </Button>
                    </div>
                    <div>
                        <div className="font-bold">默认</div>
                        <div className="flex items-center">
                            <Input className="mr-[5px] rounded-full"></Input>
                            <Button size="middle" className="rounded-full">
                                复制
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div className="flex pt-[20px]">
                <Input
                    placeholder="渠道名称"
                    className="mr-[5px] rounded-full"
                ></Input>
                <Button className="rounded-full" type="primary">
                    创建新渠道
                </Button>
            </div>
        </div>
    )
}

export const TabItems = [
    {
        key: 'work',
        label: '发布为作品',
        children: <TabContent />,
    },
    {
        key: 'template',
        label: '发布为模板',
        children: <div>2</div>,
    },
]
