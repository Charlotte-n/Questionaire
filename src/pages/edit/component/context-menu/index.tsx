import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { MergeProps } from '../../../../stores/commonproperties'
import { getParentElement } from '../../../utils/util'

export interface ActionItem {
    action: (cid?: string) => void
    text: string
    shortcut: string
}
interface IProps {
    children?: ReactNode
    actions: ActionItem[]
    triggerClass?: string
    setActive: (
        { id, type }: { id?: string; type: string },
        e?: MouseEvent,
    ) => void
}

const defaultProp = {
    triggerClass: 'edit-wrapper',
}
const ContextMenu: FC<IProps> = (props) => {
    const menuRef = useRef(null)
    const defaultProps = MergeProps<IProps>(defaultProp, props)
    const { actions, triggerClass } = defaultProps
    const [cid, setCid] = useState('')

    const triggerClick = (e: MouseEvent) => {
        const DomElement = menuRef.current as unknown as HTMLElement
        //获取父节点
        const element = getParentElement(
            e.target as HTMLElement,
            triggerClass as string,
        )

        //右键的时候选中该元素
        const id = element?.dataset.id as string
        props.setActive && props.setActive({ id, type: 'element' })
        setCid(id)

        if (element) {
            e.preventDefault()
            DomElement.style.display = 'block'
            DomElement.style.top = e.pageY + 'px'
            DomElement.style.left = e.pageX + 'px'
        }
    }
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        const DomElement = menuRef.current as unknown as HTMLElement
        DomElement.style.display = 'none'
    }

    useEffect(() => {
        document.addEventListener('contextmenu', triggerClick)
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('contextmenu', triggerClick)
            document.removeEventListener('click', handleClick)
        }
    })
    return (
        <div className="bg-[#FFF] hidden absolute z-[2000]" ref={menuRef}>
            <ul className="border-[1px] border-solid border-[#C3C3C4]  px-[3px] py-[3px]">
                {actions.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            item.action(cid)
                        }}
                        className="cursor-pointer hover:bg-[#C3C3C4] px-[15px] py-[8px] mb-[10px]"
                    >
                        <span>{item.text} </span>
                        <span>{item.shortcut}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default memo(ContextMenu)
