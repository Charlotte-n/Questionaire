import { FC, ReactNode, memo, useState, useRef, useEffect } from 'react'
import { Input, message } from 'antd'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useKeyPress } from '../../hooks/useKeyPress'

interface IInputEditProps {
    children: {
        default: ReactNode
    }
    value: string
    changeValue: (id: string, key: string, value: string) => void
    id: string
    currentEditId: any
    setCurrentEditId: (id: any) => void
    changeType: string
}

// 文本编辑,TODO:记着添加默认值
export const InputEdit: FC<IInputEditProps> = memo(
    ({
        children = { default: null },
        value = '',
        changeValue = () => {},
        id = '',
        currentEditId,
        setCurrentEditId = () => {},
        changeType = 'layerName',
    }) => {
        const [innerValue, setInnerValue] = useState(value)
        const wrapperRef = useRef(null)
        const { isClickOutSide, setIsClickOutSide } = useClickOutside(
            wrapperRef.current as any,
        )
        const inputRef = useRef(null)

        useKeyPress('Enter', () => {
            //判断这个值不能为空
            if (!innerValue) {
                message.error('文本不能为空')
                return
            }
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
                if (!innerValue) {
                    message.error('文本不能为空')
                    return
                }
                setCurrentEditId(null)
                changeValue(id, changeType, innerValue)
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
