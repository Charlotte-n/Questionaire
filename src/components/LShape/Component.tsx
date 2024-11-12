import React, { FC, useEffect } from 'react'
import {
    MergeProps,
    ShapeProperties,
    ShapeStylePropName,
} from '../../stores/commonproperties'
import useComponentCommon from '../../hooks/useComponentCommon'
import './index.css'

const LShape: FC<any> = (props: any) => {
    const defaultProps = MergeProps(ShapeProperties, props) as any
    const { styleProps, handleClick } = useComponentCommon(
        defaultProps,
        ShapeStylePropName,
    )
    useEffect(() => {
        console.log(styleProps)
    }, [])

    return React.createElement('span', {
        style: styleProps,
        className: 'l-shape-span',
    })
}

export default LShape
