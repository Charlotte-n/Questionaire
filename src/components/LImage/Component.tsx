import React, { FC } from 'react'
import { MergeProps } from '../../stores/commonproperties'

interface Props {
    url: string
    width?: string
    height?: string
}
const defaultProp = { url: 'test.js', width: '100%', height: '100%' }
const LImageComponent: FC<Props> = (props) => {
    const defaultProps = MergeProps(defaultProp, props)
    const { url, width, height } = defaultProps
    return (
        <div>
            <img
                src={url}
                width={width}
                height={height}
                style={{ height: height, width: width }}
            />
        </div>
    )
}

export default LImageComponent
