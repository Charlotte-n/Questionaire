import React, { memo, useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import { pick } from 'lodash-es'
import { LTextProps } from './interface'

const LText: FC<LTextProps> = (props) => {
    const styleProps = useMemo(() => pick(props, ['fontSize']), [props])
    const { text } = props
    return (
        <>
            <div style={styleProps}>{text}</div>
        </>
    )
}

export default memo(LText)
