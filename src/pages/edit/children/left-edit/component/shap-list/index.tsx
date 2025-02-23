import { Row } from 'antd'
import { FC } from 'react'
import LShape from '../../../../../../components/LShape/Component'
import { defaultShapes } from './config'
import { useAppDispatch, useAppSelector } from '../../../../../../stores'
import { addComponent } from '../../../../../../stores/editor'
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const ShapeList: FC = () => {
    const dispatch = useAppDispatch()
    const { components } = useAppSelector((state) => state.editorSlice)
    const onItemClick = (item: any) => {
        dispatch(
            addComponent({
                name: 'l-shape',
                id: uuidv4(),
                props: {
                    ...item,
                },
                layerName: '图层' + (components.length + 1),
            }),
        )
    }
    return (
        <div className='h-[80vh] overflow-auto scroll-hidden'>
            {defaultShapes.map((item) => {
                return (
                    <Row
                        key={item.id}
                        className="flex justify-center mt-[15px]"
                        onClick={() => onItemClick(item)}
                    >
                        <LShape {...item}></LShape>
                    </Row>
                )
            })}
        </div>
    )
}

export default ShapeList
