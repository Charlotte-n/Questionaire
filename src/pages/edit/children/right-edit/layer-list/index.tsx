import { Button, Input, Tooltip } from 'antd'
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { ComponentData } from '../../../../../stores/editor'
import {
    DragOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LockOutlined,
    UnlockOutlined,
} from '@ant-design/icons'
import { InputEdit } from '../../../../../components/InputEdit'
import {
    SortableContainer as sortableContainer,
    SortableElement,
    SortableHandle,
} from 'react-sortable-hoc'

interface IProps {
    children?: ReactNode
    list: ComponentData[]
    change: (data: { id: string; key: string; value: any }) => void
    setActive: (
        { id, type }: { id?: string; type: string },
        event?: any,
    ) => void
    currentElement: string
    handleSort: (list: ComponentData[]) => void
}

interface ISortableItemProps {
    change: (data: { id: string; key: string; value: any }) => void
    setActive: (
        { id, type }: { id?: string; type: string },
        event?: any,
    ) => void
    currentElement: string
    item: ComponentData
    sortIndex: number
}

//拖拽图标
const DragHandler = SortableHandle(() => {
    return (
        <Tooltip title={'拖动排序'}>
            <Button shape="circle" icon={<DragOutlined />}></Button>
        </Tooltip>
    )
})

const List = ({
    item,
    change,
    setActive,
    currentElement,
}: ISortableItemProps) => {
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
        // TODO:想一想这里tailWindcss太长导致的问题有什么，以及tailWindCss是怎么运行的
        <li
            key={item.id}
            className={`flex flex-1 justify-between px-[10px] pt-[10px] pb-[10px] border-b-[1px] border-solid cursor-pointer hover:bg-[#eaf7fe] ${item.id === currentElement ? 'border-[1px] border-[#1890ff]' : ''}`}
            onClick={(event) => {
                setActive({ id: item.id, type: 'element' }, event)
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
                            handleChange(item.id, 'isHidden', !item.isHidden)
                        }}
                    ></Button>
                </Tooltip>
                <Tooltip title={item.isBlock ? '解锁' : '锁定'}>
                    <Button
                        shape="circle"
                        icon={
                            item.isBlock ? <UnlockOutlined /> : <LockOutlined />
                        }
                        onClick={(e) => {
                            handleChange(item.id, 'isBlock', !item.isBlock)
                        }}
                    ></Button>
                </Tooltip>
            </div>
            <div>
                <InputEdit
                    value={item.layerName}
                    changeValue={changeValue}
                    id={item.id}
                    currentEditId={currentEditId}
                    setCurrentEditId={setCurrentEditId}
                    changeType="layerName"
                >
                    {{
                        default: <div>{item.layerName}</div>,
                    }}
                </InputEdit>
            </div>

            <DragHandler></DragHandler>
        </li>
    )
}

//排序item

const SortableItem: any = SortableElement(
    ({
        sortIndex,
        item,
        change,
        setActive,
        currentElement,
    }: ISortableItemProps) => {
        return (
            <div className="flex">
                <List
                    item={item}
                    change={change}
                    setActive={setActive}
                    currentElement={currentElement}
                    sortIndex={sortIndex}
                ></List>
            </div>
        )
    },
)

//排序容器
const SortableContainer: any = sortableContainer(({ children }: any) => {
    return <div>{children}</div>
})
const LayerList: FC<IProps> = ({
    list,
    change,
    setActive,
    currentElement,
    handleSort,
}) => {
    const arrayMoveMutate = useCallback(
        (array: any, fromIndex: number, toIndex: number) => {
            const startIndex =
                fromIndex < 0 ? array.length + fromIndex : fromIndex
            if (startIndex >= 0 && startIndex < array.length) {
                const endIndex = toIndex < 0 ? array.length + toIndex : toIndex
                const [item] = array.splice(fromIndex, 1)
                array.splice(endIndex, 0, item)
            }
        },
        [list],
    )

    // 拖拽时返回新数组
    const arrayMoveImmutate = useCallback(
        (array: any, fromIndex: number, toIndex: number) => {
            array = [...array]
            arrayMoveMutate(array, fromIndex, toIndex)
            return array
        },
        [list],
    )

    const handleSortEnd = ({
        oldIndex,
        newIndex,
    }: {
        oldIndex: number
        newIndex: number
    }) => {
        const List = arrayMoveImmutate(list, oldIndex, newIndex)
        handleSort(List)
    }
    return (
        <SortableContainer onSortEnd={handleSortEnd} useDragHandle>
            <ul className="border-[1px] border-solid">
                {list?.map((item, index) => {
                    return (
                        <SortableItem
                            key={item.id}
                            index={index}
                            sortIndex={index}
                            item={item}
                            change={change}
                            setActive={setActive}
                            currentElement={currentElement}
                        ></SortableItem>
                    )
                })}
            </ul>
        </SortableContainer>
    )
}

export default memo(LayerList)
