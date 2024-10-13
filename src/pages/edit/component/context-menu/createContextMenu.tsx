import ContextMenu, { ActionItem } from './index'
import { createRoot } from 'react-dom/client'
export const createContextMenu = (
    actions: ActionItem[],
    triggerClass: string,
    setActive: (
        {
            id,
            type,
        }: {
            id?: string
            type: string
        },
        e?: MouseEvent,
    ) => void,
) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const closeContextMenu = () => {
        // 卸载组件并移除 DOM
        const root = createRoot(container)
        root.unmount()
        document.body.removeChild(container)
    }

    const renderContextMenu = () => {
        const root = createRoot(container)
        root.render(
            <ContextMenu
                actions={actions}
                triggerClass={triggerClass}
                setActive={setActive}
            />,
        )
    }
    renderContextMenu()

    return closeContextMenu
}
