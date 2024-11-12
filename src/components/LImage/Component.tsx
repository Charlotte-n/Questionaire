import React, { FC } from 'react'
import { MergeProps } from '../../stores/commonproperties'

interface Props {
    url: string
    width?: string
    height?: string
    onItemClick?: () => void
}
const defaultProp = { url: 'test.js', width: '100%', height: '100%' }
const LImageComponent: FC<Props> = (props) => {
    const defaultProps = MergeProps(defaultProp, props)
    const { url, width, height, onItemClick, imageSrc } = defaultProps as any
    return (
        <div>
            <img
                src={imageSrc}
                width={width}
                height={height}
                style={{ height: height, width: width }}
                onClick={onItemClick}
            />
        </div>
    )
}

export default LImageComponent
