import { useHotKeys } from '../hooks/useHotKeys'
import { useAppDispatch, useAppSelector } from '../stores'
import { copyComponent } from '../stores/editor'
export const initHotKeys = () => {
    const dispatch = useAppDispatch()
    const { defaultEditorData } = useAppSelector((state) => state.editorSlice)

    useHotKeys('ctrl+c, command+c', function () {
        dispatch(copyComponent(defaultEditorData.currentElement))
    })
}
