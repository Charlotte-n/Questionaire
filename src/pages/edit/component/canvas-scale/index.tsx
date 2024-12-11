import { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

interface IProps {
    children?: ReactNode
    getScaleNumber: (scale: number) => void
}

const CanvasScale: FC<IProps> = (props) => {
    const [scale, setScale] = useState(100)
    const { getScaleNumber } = props

    const scaleChange = (type: string) => {
        if (type === 'increase') {
            if (scale < 100) {
                setScale(scale + 10)
            }
        } else {
            if (scale <= 100 && scale > 70) {
                setScale(scale - 10)
            }
        }
    }
    useEffect(() => {
        getScaleNumber(scale)
    }, [scale])
    return <div className='rounded-full  bg-[white] px-[20px] py-[10px]'>
        <MinusOutlined className={`mr-[10px] ${scale <= 70 ? 'text-gray-300' : 'cursor-pointer'}`} onClick={() => scaleChange('decrease')} />
        <span>{scale} %</span>
        <PlusOutlined className={`ml-[10px] ${scale >= 100 ? 'text-gray-300' : 'cursor-pointer'}`} onClick={() => scaleChange('increase')} />
    </div>
}

export default memo(CanvasScale)
