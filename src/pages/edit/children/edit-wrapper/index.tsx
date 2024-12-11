import React, { FC, forwardRef, memo, MouseEvent, useCallback, useRef, useImperativeHandle } from 'react'
import useComponentCommon from '../../../../hooks/useComponentCommon'
import './index.css'
import { TextProperties } from '../../../../stores/commonproperties'

interface Props {
    setActive: (
        { id, type }: { id?: string; type: string },
        event: MouseEvent,
    ) => void
    id: string
    children: any
    onChange?: (value: any) => void
    props: any
    isActive: boolean
    onTabChange: (key: string) => void
    tabActiveKey: string
}
type SizeType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface PositionType {
    left: number
    top: number
    right: number
    bottom: number
}

const EditWrapper = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { setActive, id, children, isActive, onTabChange, tabActiveKey } = props
    const { styleProps } = useComponentCommon(
        {
            ...TextProperties,
            ...props.props,
        },
        ['position', 'top', 'left', 'width', 'height'],
    )
    const editWrapperRef = useRef<HTMLDivElement>(null)
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

    const caculateSize = (
        type: SizeType,
        e: MouseEvent,
        position: PositionType,
    ) => {
        const { left, top, bottom, right } = position
        const { clientX, clientY } = e
        const container: HTMLElement = document.querySelector('.canvas-area')!
        const rightWidth = clientX - left
        const bottomHeight = clientY - top
        const leftWidth = right - clientX
        const topHeight = bottom - clientY
        const leftOffset = clientX - container.offsetLeft
        const topOffset = clientY - container.offsetTop
        switch (type) {
            case 'top-left':
                return {
                    width: leftWidth,
                    height: topHeight,
                    top: topOffset,
                    left: leftOffset,
                }
            case 'top-right':
                return {
                    width: rightWidth,
                    height: topHeight,
                    top: topOffset,
                }
            case 'bottom-left':
                return {
                    width: leftWidth,
                    height: bottomHeight,
                    left: leftOffset,
                }
            case 'bottom-right':
                return {
                    width: rightWidth,
                    height: bottomHeight,
                }
            default:
                break
        }
    }

    //TODO: 这个可以写在遇到的困难
    const MoveStart = useCallback(
        (e: MouseEvent) => {
            //查一下这个什么意思:阻止拖拽的默认行为,比如图片会先拖出影子，最后在改变位置，会出现禁止拖拽的标志
            e.preventDefault()
            const currentElement: HTMLElement = editWrapperRef.current!
            if (!currentElement) return

            // 计算鼠标点击位置与元素左上角的偏移量
            gap.current.x =
                e.clientX - currentElement.getBoundingClientRect().left
            gap.current.y =
                e.clientY - currentElement.getBoundingClientRect().top

            let animationFrameId: number

            // 监听mousemove事件
            const handleMove = (e: MouseEvent) => {
                // 使用requestAnimationFrame优化渲染
                animationFrameId = requestAnimationFrame(() => {
                    const { left, top } = caculateMovePosition(e)
                    currentElement.style.left = `${left}px`
                    currentElement.style.top = `${top}px`
                })
                //更新到store里面
            }

            const handleMoveUp = () => {
                document.removeEventListener('mousemove', handleMove as any)
                cancelAnimationFrame(animationFrameId)
                // 更新属性
                props.onChange &&
                    props.onChange({
                        id,
                        key: ['left', 'top'],
                        value: [
                            currentElement.style.left,
                            currentElement.style.top,
                        ],
                    })

                setTimeout(() => {
                    document.removeEventListener('mouseup', handleMoveUp)
                }, 0)
            }

            document.addEventListener('mousemove', handleMove as any)
            document.addEventListener('mouseup', handleMoveUp)
        },
        [id, props, editWrapperRef],
    )

    //TODO: 拖拽原点
    const ResizeStart = (direction: SizeType) => {
        const currentElement: HTMLElement = editWrapperRef.current!
        if (!currentElement) return
        let size: any

        const handleMove = (e: MouseEvent) => {
            size = caculateSize(
                direction,
                e,
                currentElement.getBoundingClientRect(),
            )
            const { style } = currentElement

            if (size) {
                style.width = size.width + 'px'
                style.height = size.height + 'px'
                if (size.left) {
                    style.left = size.left + 'px'
                }
                if (size.top) {
                    style.top = size.top + 'px'
                }
            }
        }
        const handleMoveUp = () => {
            document.removeEventListener('mousemove', handleMove as any)
            props.onChange &&
                props.onChange({
                    id,
                    key: [
                        'width',
                        'height',
                        size?.left ? 'left' : '',
                        size?.top ? 'top' : '',
                    ],
                    value: [
                        currentElement.style.width,
                        currentElement.style.height,
                        size?.left ? currentElement.style.left : '',
                        size?.top ? currentElement.style.top : '',
                    ],
                })

            setTimeout(() => {
                document.removeEventListener('mouseup', handleMoveUp as any)
            })
        }
        document.addEventListener('mousemove', handleMove as any)
        document.addEventListener('mouseup', handleMoveUp as any)
    }

    return (
        <div
            className="edit-wrapper relative"
            ref={editWrapperRef}
            onClick={(event: MouseEvent) => {
                //如果为图层，则不触发点击事件
                if (tabActiveKey !== '2') {
                    onTabChange('1')
                }
                setActive({ id, type: 'element' }, event)
                event.stopPropagation()
            }}
            style={styleProps}
            data-id={id}
        >
            <div
                className="move-wrapper z-[100] cursor-pointer w-[100%] h-[100%]"
                ref={moveWrapperRef}
                onMouseDown={(e) => MoveStart(e)}
            >
                {children.content}
            </div>
            {/* 四个拖拽原点 */}
            {isActive && (
                <div className="resizes">
                    <div
                        className="resize top-left"
                        onMouseDown={() => ResizeStart('top-left')}
                    ></div>
                    <div
                        className="resize top-right"
                        onMouseDown={() => ResizeStart('top-right')}
                    ></div>
                    <div
                        className="resize bottom-left"
                        onMouseDown={() => ResizeStart('bottom-left')}
                    ></div>
                    <div
                        className="resize bottom-right"
                        onMouseDown={(e) => ResizeStart('bottom-right')}
                    ></div>
                </div>
            )}
        </div>
    )
})

export default EditWrapper
