import { Button, Tooltip } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ComponentData } from '../../../../stores/editor'
import {
    DragOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    UnlockOutlined,
} from '@ant-design/icons'

interface IProps {
    children?: ReactNode
    list: ComponentData[]
    change: (data: { id: string; key: string; value: any }) => void
    setActive: (id: string) => void
}

const LayerList: FC<IProps> = ({ list, change, setActive }) => {
    const handleChange = (id: string, key: string, value: any) => {
        const data = {
            id,
            key,
            value,
            isRoot: true,
        }
        change(data)
    }

    const handleActive = (id: string) => {
        setActive(id)
    }
    return (
        <ul className=" px-[10px]">
            {list?.map((item) => {
                return (
                    <li
                        key={item.id}
                        className="flex justify-between pt-[20px] pb-[20px] border-b-[1px] border-solid"
                        onClick={() => handleActive(item.id)}
                    >
                        <div>
                            <Tooltip
                                title={item.isHidden ? '显示' : '隐藏'}
                                className="mr-[20px]"
                            >
                                <Button
                                    shape="circle"
                                    icon={
                                        item.isHidden ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                    onClick={() =>
                                        handleChange(
                                            item.id,
                                            'isHidden',
                                            !item.isHidden,
                                        )
                                    }
                                ></Button>
                            </Tooltip>
                            <Tooltip title={item.isBlock ? '解锁' : '锁定'}>
                                <Button
                                    shape="circle"
                                    icon={
                                        item.isBlock ? (
                                            <UnlockOutlined />
                                        ) : (
                                            <LockOutlined />
                                        )
                                    }
                                    onClick={() =>
                                        handleChange(
                                            item.id,
                                            'isBlock',
                                            !item.isBlock,
                                        )
                                    }
                                ></Button>
                            </Tooltip>
                        </div>
                        <span>图层一</span>
                        <Tooltip title={'拖动排序'}>
                            <Button
                                shape="circle"
                                icon={<DragOutlined />}
                            ></Button>
                        </Tooltip>
                    </li>
                )
            })}
        </ul>
    )
}

export default memo(LayerList)
