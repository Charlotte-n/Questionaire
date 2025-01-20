import { FC, useRef } from 'react'
import { defaultTemplates } from './config'
import LText from '../../../../../../components/LText/Component'
import './index.css'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../../../../stores/editor'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../../../../../stores'
import { useDrag } from 'react-dnd'

const ComponentList: FC<{}> = () => {
    const dispatch = useDispatch()
    const { components } = useAppSelector((state) => state.editorSlice)
    const onItemClick = (item: any) => {
        if (typeof item !== 'object' || item === null) {
            console.error('Item is not an object:', item)
            return
        }
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
                const [, drag] = useDrag(() => ({
                    type: 'left-editor',
                    collect: (monitor) => ({
                        isDragging: monitor.isDragging()
                    }),
                    item: {
                        name: 'l-text',
                        id: uuidv4(),
                        props: {
                            ...item,
                        },
                        layerName: '图层' + (components.length + 1),

                    }

                }))

                return (
                    <div
                        key={item.id}
                        className=" justify-center mb-[20px] flex"
                    >
                        <div
                            // onClick={() => onItemClick(item)}
                            className="text-show relative flex items-center cursor-pointer"
                            ref={drag}
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
