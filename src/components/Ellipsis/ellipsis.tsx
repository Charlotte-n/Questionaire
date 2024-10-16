import React, { FC, CSSProperties } from 'react'

interface EllipsisProps {
    lines?: number // 最大显示行数
    style?: CSSProperties // 允许自定义样式
    text: string
}

const Ellipsis: FC<EllipsisProps> = ({ lines = 1, style, text }) => {
    const ellipsisStyle: CSSProperties = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...style,
    }

    return <div style={ellipsisStyle}>{text}</div>
}

export default Ellipsis
