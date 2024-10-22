import React, { FC, useCallback } from 'react'
import { defaultTemplates } from './config'
import LText from '../../../../../../components/LText/Component'
import './index.css'

const ComponentList: FC<{
    onItemClick: (item: any) => void
}> = ({ onItemClick }) => {
    //添加上传
    return (
        <>
            {defaultTemplates.map((item) => {
                return (
                    <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        className="text-show flex justify-center"
                    >
                        <LText {...item}></LText>
                    </div>
                )
            })}
        </>
    )
}

export default ComponentList
