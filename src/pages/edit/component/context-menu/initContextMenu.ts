import { useEffect } from 'react'
import { ActionItem } from './index'
import { createContextMenu } from './createContextMenu'
import { useAppDispatch } from '../../../../stores'
import {
    clearSelected,
    copyComponent,
    deleteComponent,
    pasteComponent,
    redo,
} from '../../../../stores/editor'

const initContextMenu = (
    seatActive: (
        { id, type }: { id?: string; type: string },
        e?: MouseEvent,
    ) => void,
) => {
    const dispatch = useAppDispatch()
    const actions: ActionItem[] = [
        {
            action: (cid?: string) => {
                dispatch(copyComponent({ id: cid }))
            },
            text: '拷贝图层',
            shortcut: 'ctrl+c or cmd+c',
        },
        {
            action: (cid?: string) => {
                dispatch(pasteComponent({ id: cid }))
            },
            text: '粘贴图层',
            shortcut: 'ctrl+v or cmd+v',
        },
        {
            action: (cid?: string) => {
                dispatch(deleteComponent({ id: cid }))
            },
            text: '删除图层',
            shortcut: 'Delete',
        },
        {
            action: () => {
                dispatch(clearSelected())
            },
            text: '取消选中',
            shortcut: '',
        },
    ]

    useEffect(() => {
        const destroy = createContextMenu(actions, 'edit-wrapper', seatActive)
        return () => {
            destroy()
        }
    }, [])
}

export default initContextMenu
