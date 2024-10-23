import React, { FC, useCallback } from 'react'
import { defaultTemplates } from './config'
import LText from '../../../../../../components/LText/Component'
import './index.css'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../../../../stores/editor'
import { v4 as uuidv4 } from 'uuid'

const ComponentList: FC<{}> = () => {
    const dispatch = useDispatch()
    const onItemClick = (item: any) => {
        console.log(item)

        dispatch(
            addComponent({
                name: 'l-text',
                id: uuidv4(),
                props: item,
            }),
        )
    }
    return (
        <>
            {defaultTemplates.map((item) => {
                return (
                    <div
                        key={item.id}
                        className=" justify-center mb-[20px] flex"
                    >
                        <div
                            onClick={() => onItemClick(item)}
                            className="text-show w-[100px] relative flex items-center "
                        >
                            <LText {...item}></LText>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ComponentList
