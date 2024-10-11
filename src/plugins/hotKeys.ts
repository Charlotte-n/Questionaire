import { HotkeysEvent, KeyHandler } from 'hotkeys-js'
import { useHotKeys } from '../hooks/useHotKeys'
import { useAppDispatch, useAppSelector } from '../stores'
import {
    copyComponent,
    pasteComponent,
    deleteComponent,
    clearSelected,
    moveComponent,
} from '../stores/editor'

const wrapper = (callback: KeyHandler) => {
    return (e: KeyboardEvent, event: HotkeysEvent) => {
        e.preventDefault()
        callback(e, event)
    }
}

export const initHotKeys = () => {
    const dispatch = useAppDispatch()
    const { defaultEditorData } = useAppSelector((state) => state.editorSlice)
    const id = defaultEditorData.currentElement

    useHotKeys('ctrl+c, command+c', function () {
        dispatch(copyComponent({ id }))
    })

    useHotKeys('ctrl+v, command+v', function () {
        dispatch(pasteComponent({ id }))
    })

    useHotKeys('backspace, delete', () => {
        dispatch(clearSelected())
        dispatch(deleteComponent({ id }))
    })

    useHotKeys('esc', () => {
        dispatch(clearSelected())
    })

    useHotKeys(
        'up',
        wrapper(() => {
            dispatch(moveComponent({ id, type: 'up', amount: 5 }))
        }),
    )

    useHotKeys(
        'down',
        wrapper(() => {
            dispatch(moveComponent({ id, type: 'down', amount: 5 }))
        }),
    )

    useHotKeys(
        'left',
        wrapper(() => {
            dispatch(moveComponent({ id, type: 'left', amount: 5 }))
        }),
    )

    useHotKeys(
        'right',
        wrapper(() => {
            dispatch(moveComponent({ id, type: 'right', amount: 5 }))
        }),
    )
}
