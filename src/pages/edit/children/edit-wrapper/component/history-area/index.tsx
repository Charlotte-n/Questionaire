import { RedoOutlined, UndoOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../stores'
import { redo, undo } from '../../../../../../stores/editor'

interface IProps {
    children?: ReactNode
}

const HistoryArea: FC<IProps> = () => {
    const dispatch = useAppDispatch()
    const { histories, historyIndex } = useAppSelector(
        (state) => state.editorSlice,
    )

    const handleUndo = () => {
        dispatch(undo())
    }

    const handleRedo = () => {
        dispatch(redo())
    }

    return (
        <div className="absolute right-[30px] top-[0px]">
            <div>
                <Tooltip title={'撤销'} className="mr-[10px]">
                    <Button
                        shape="circle"
                        onClick={handleUndo}
                        disabled={histories.length === 0 || historyIndex === 0}
                    >
                        <UndoOutlined></UndoOutlined>
                    </Button>
                </Tooltip>
                <Tooltip title={'重做'}>
                    <Button
                        shape="circle"
                        onClick={handleRedo}
                        disabled={
                            histories.length === 0 ||
                            historyIndex === histories.length ||
                            historyIndex === -1
                        }
                    >
                        <RedoOutlined></RedoOutlined>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default memo(HistoryArea)
