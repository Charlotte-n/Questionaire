import React, { FC } from 'react'
import { defaultTemplates } from '../../../../data/defaultTemplates'
import LText from '../../../../components/LText/Component'

const ComponentList: FC<{
    onItemClick: (item: any) => void
}> = ({ onItemClick }) => {
    return (
        <>
            {defaultTemplates.map((item) => {
                return (
                    <div key={item.id} onClick={() => onItemClick(item)}>
                        <LText {...item}></LText>
                    </div>
                )
            })}
        </>
    )
}

export default ComponentList
