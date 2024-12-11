import React, { FC, useCallback } from 'react'
import { defaultTemplates } from './config'
import LText from '../../../../../../components/LText/Component'
import './index.css'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../../../../stores/editor'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../../../../../stores'

const ComponentList: FC<{}> = () => {
    const dispatch = useDispatch()
    const { components } = useAppSelector((state) => state.editorSlice)
    const onItemClick = (item: any) => {
        dispatch(
            addComponent({
                name: 'l-text',
                id: uuidv4(),
                props: item,
                layerName: '图层' + (components.length + 1),
            }),
        )
    }
    return (
        <div className=' h-[80vh] scroll-hidden'>
            {defaultTemplates.map((item) => {
                return (
                    <div
                        key={item.id}
                        className=" justify-center mb-[20px] flex"
                    >
                        <div
                            onClick={() => onItemClick(item)}
                            className="text-show relative flex items-center "
                        >
                            <LText {...item}></LText>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ComponentList
