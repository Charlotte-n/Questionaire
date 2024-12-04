import React, { FC } from 'react'
import { imageStylePropName, MergeProps } from '../../stores/commonproperties'
import useComponentCommon from '../../hooks/useComponentCommon'

interface Props {
    url: string
    width?: string
    height?: string
    onItemClick?: () => void
}
const defaultProp = { url: 'test.js', width: '100%', height: '100%' }
const LImageComponent: FC<Props> = (props) => {
    const defaultProps = MergeProps(defaultProp, props) as any
    const { url, width, height, onItemClick, imageSrc } = defaultProps as any
    const { styleProps } = useComponentCommon(defaultProps, imageStylePropName)
    return (
        <div style={styleProps} className='l-image'>
            <img
                src={url ? url : imageSrc}
                width={width}
                height={height}
                style={{ width, height }}
                onClick={onItemClick}
            />
        </div>
    )
}

export default LImageComponent
