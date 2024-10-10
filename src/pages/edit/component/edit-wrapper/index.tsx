import React, { FC, MouseEvent, useCallback, useEffect, useRef } from 'react'
import useComponentCommon from '../../../../hooks/useComponentCommon'
import { current } from 'immer'
interface Props {
    setActive: (event: MouseEvent, id: string) => void
    id: string
    children: any
    onChange?: (value: any) => void
    props: any
}
const EditWrapper: FC<Props> = (props) => {
    const { setActive, id, children } = props
    const { styleProps } = useComponentCommon(props.props, [
        'position',
        'top',
        'left',
        'width',
        'height',
    ])
    const editWrapperRef = useRef(null)
    const moveWrapperRef = useRef(null)
    const gap = useRef({ x: 0, y: 0 })

    const caculateMovePosition = (e: MouseEvent) => {
        const container: HTMLElement = document.querySelector('.canvas-area')!
        const left =
            e.clientX - gap.current.x - container.getBoundingClientRect().left
        const top =
            e.clientY - gap.current.y - container.getBoundingClientRect().top

        return {
            left,
            top,
        }
    }

    //TODO: 这个可以写在遇到的困难
    const MoveStart = (e: MouseEvent) => {
        //查一下这个什么意思:阻止拖拽的默认行为,比如图片会先拖出影子，最后在改变位置，会出现禁止拖拽的标志
        e.preventDefault()
        const currentElement: HTMLElement = editWrapperRef.current!
        if (!currentElement) return

        // 计算鼠标点击位置与元素左上角的偏移量
        gap.current.x = e.clientX - currentElement.getBoundingClientRect().left
        gap.current.y = e.clientY - currentElement.getBoundingClientRect().top

        let animationFrameId: number

        // 监听mousemove事件
        const handleMove = (e: MouseEvent) => {
            // 使用requestAnimationFrame优化渲染
            animationFrameId = requestAnimationFrame(() => {
                const { left, top } = caculateMovePosition(e)
                currentElement.style.left = `${left}px`
                currentElement.style.top = `${top}px`
            })
        }

        const handleMoveUp = () => {
            document.removeEventListener('mousemove', handleMove)
            cancelAnimationFrame(animationFrameId)

            // 更新属性
            props.onChange &&
                props.onChange({
                    id,
                    left: currentElement.style.left,
                    top: currentElement.style.top,
                })

            setTimeout(() => {
                document.removeEventListener('mouseup', handleMoveUp)
            }, 0)
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleMoveUp)
    }

    return (
        <div
            className="edit-wrapper "
            ref={editWrapperRef}
            onClick={(event: MouseEvent) => setActive(event, id)}
            style={styleProps}
        >
            <div
                className="move-wrapper z-[100] cursor-pointer"
                ref={moveWrapperRef}
                onMouseDown={(e) => MoveStart(e)}
            >
                {children.content}
            </div>
        </div>
    )
}

export default EditWrapper
