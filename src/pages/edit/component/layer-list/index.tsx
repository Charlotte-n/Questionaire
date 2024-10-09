import { Button, Input, Tooltip } from 'antd'
import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { ComponentData } from '../../../../stores/editor'
import {
    DragOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    UnlockOutlined,
} from '@ant-design/icons'
import { useKeyPress } from '../../../../hooks/useKeyPress'
import { useClickOutside } from '../../../../hooks/useClickOutside'

interface IProps {
    children?: ReactNode
    list: ComponentData[]
    change: (data: { id: string; key: string; value: any }) => void
    setActive: (event: MouseEvent, id: string) => void
    currentElement: string
}

interface IInputEditProps {
    children: {
        default: ReactNode
    }
    value: string
    changeValue: (id: string, key: string, value: string) => void
    id: string
    currentEditId: any
    setCurrentEditId: (id: any) => void
}

const InputEdit: FC<IInputEditProps> = memo(
    ({ children, value, changeValue, id, setCurrentEditId, currentEditId }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [innerValue, setInnerValue] = useState(value)
        const wrapperRef = useRef(null)
        const { isClickOutSide, setIsClickOutSide } = useClickOutside(
            wrapperRef.current as any,
        )
        const inputRef = useRef(null)

        useKeyPress('Enter', () => {
            changeValue(id, 'layerName', innerValue)
            setCurrentEditId(null)
        })

        useKeyPress('Escape', () => {
            setCurrentEditId(null)
        })

        useEffect(() => {
            if (currentEditId === id) {
                ;(inputRef.current as unknown as HTMLElement)?.focus()
            }
        }, [currentEditId])

        useEffect(() => {
            if (isClickOutSide && currentEditId) {
                setCurrentEditId(null)
                changeValue(id, 'layerName', innerValue)
            }
            setIsClickOutSide(false)
        }, [isClickOutSide])

        return (
            <div>
                <div
                    onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation()
                        setCurrentEditId(id)
                    }}
                    ref={wrapperRef}
                >
                    {currentEditId === id ? (
                        <Input
                            ref={inputRef}
                            placeholder="文本不能为空"
                            value={innerValue}
                            onChange={(event) =>
                                setInnerValue(event.target.value)
                            }
                        ></Input>
                    ) : (
                        children.default
                    )}
                </div>
            </div>
        )
    },
)

const LayerList: FC<IProps> = ({ list, change, setActive, currentElement }) => {
    const [currentEditId, setCurrentEditId] = useState(null)

    const handleChange = (id: string, key: string, value: any) => {
        const data = {
            id,
            key,
            value,
            isRoot: true,
        }
        change(data)
    }
    const changeValue = (id: string, key: string, value: string) => {
        const data = {
            id,
            key,
            value,
            isRoot: true,
        }
        change(data)
    }

    return (
        <ul className="border-[1px] border-solid">
            {list?.map((item) => {
                return (
                    <li
                        key={item.id}
                        className={`flex justify-between px-[10px] pt-[10px] pb-[10px] border-b-[1px] border-solid cursor-pointer hover:bg-[#eaf7fe] ${item.id === currentElement ? 'border-[1px] border-[#1890ff]' : ''}`}
                        onClick={(event: any) => {
                            setActive(event, item.id)
                        }}
                    >
                        <div className="flex-2">
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
                                    onClick={(e) => {
                                        handleChange(
                                            item.id,
                                            'isHidden',
                                            !item.isHidden,
                                        )
                                    }}
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
                                    onClick={(e) => {
                                        handleChange(
                                            item.id,
                                            'isBlock',
                                            !item.isBlock,
                                        )
                                    }}
                                ></Button>
                            </Tooltip>
                        </div>
                        <div className="flex-1">
                            <InputEdit
                                value={item.layerName}
                                changeValue={changeValue}
                                id={item.id}
                                currentEditId={currentEditId}
                                setCurrentEditId={setCurrentEditId}
                            >
                                {{
                                    default: <div>{item.layerName}</div>,
                                }}
                            </InputEdit>
                        </div>

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
