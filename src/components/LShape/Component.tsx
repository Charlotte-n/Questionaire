import React, { FC, useEffect } from 'react'
import {
    MergeProps,
    ShapeProperties,
    ShapeStylePropName,
} from '../../stores/commonproperties'
import useComponentCommon from '../../hooks/useComponentCommon'

const LShape: FC<any> = (props: any) => {
    const defaultProps = MergeProps(ShapeProperties, props) as any
    const { styleProps, handleClick } = useComponentCommon(
        defaultProps,
        ShapeStylePropName,
    )

    return React.createElement(defaultProps.tag, {
        style: styleProps,
    })
}

export default LShape
