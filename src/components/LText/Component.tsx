import React, { memo, useEffect } from 'react'
import type { FC } from 'react'
import { OptionalLTextPropsType } from './interface'
import {
    MergeProps,
    TextProperties,
    textStylePropName,
} from '../../stores/commonproperties'
import useComponentCommon from '../../hooks/useComponentCommon'

const LText: FC<OptionalLTextPropsType> = (props) => {
    const mergeProps = MergeProps(TextProperties, props)
    const { styleProps } = useComponentCommon(mergeProps, textStylePropName)

    useEffect(() => {
        console.log(styleProps, 'wode ')
    })
    return (
        <>
            {React.createElement(
                mergeProps.tag,
                {
                    style: styleProps,
                },
                mergeProps.text,
            )}
        </>
    )
}

export default memo(LText)
