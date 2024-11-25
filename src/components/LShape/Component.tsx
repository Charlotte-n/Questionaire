import React, { FC } from 'react'
import {
    MergeProps,
    ShapeProperties,
    ShapeStylePropName,
} from '../../stores/commonproperties'
import useComponentCommon from '../../hooks/useComponentCommon'
import './index.css'

const LShape: FC<any> = (props) => {
    const defaultProps = MergeProps(ShapeProperties, props) as any
    const { styleProps } = useComponentCommon(defaultProps, ShapeStylePropName)

    return React.createElement('span', {
        style: {
            ...styleProps,
            position: 'static',
        },
        className: 'l-shape-span',
    })
}

export default LShape
