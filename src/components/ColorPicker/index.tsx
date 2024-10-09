import { FC, useState } from 'react'
import { MergeProps } from '../../stores/commonproperties'

const defaultColors = [
    '#ffffff',
    '#f5222d',
    '#fa541c',
    '#fadb14',
    '#52c41a',
    '#1890ff',
    '#722ed1',
    '#8c8c8c',
    '#000000',
    '',
]

interface Props {
    color?: string
    onItemClick?: (color: string) => void
}
const ColorPicker: FC<Props> = (props) => {
    const defaultProps = MergeProps(props, { color: props.color || '#000000' })
    const [color, setColor] = useState(() => defaultProps.color)
    function onChangeColor(color: string) {
        setColor(color)
        props.onItemClick && props.onItemClick(color)
    }

    return (
        <>
            <div className="flex items-center">
                <div className="mr-[20px]">
                    <input
                        type="color"
                        role="color"
                        value={color}
                        onChange={(e) => onChangeColor(e.target.value)}
                        className="border-none w-[80px] h-[50px]"
                    ></input>
                </div>
                <div>
                    <ul className="grid grid-cols-5 gap-2 picked-color-list">
                        {defaultColors.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => onChangeColor(item)}
                                >
                                    <div
                                        className="w-[25px] h-[25px] cursor-pointer border-[1px] border-solid border-[#ccc] rounded-sm"
                                        style={{
                                            backgroundColor: item,
                                        }}
                                    ></div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ColorPicker
