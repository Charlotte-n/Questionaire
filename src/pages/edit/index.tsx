import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType, OptionalLTextPropsType } from '../../components/LText'
import { addComponent, ComponentData } from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import ComponentList from './component/component-list'

function getComponent(c: ComponentData) {
    const { props, name }: { props: LTextPropsType; name: string } = c
    const { Component } = getComponentConfByType(name) as ComponentConfType
    return (
        <>
            <Component {...props}></Component>
        </>
    )
}
const Editor: FC = () => {
    const { defaultEditorData } = useAppSelector((state) => state.editorSlice)
    const dispatch = useAppDispatch()
    function addItem(props: any) {
        console.log(123, props)
        dispatch(addComponent(props))
    }
    return (
        <div className="flex items-center text-center h-[100vh]">
            <div className="flex-1  h-[100%]">
                <ComponentList onItemClick={addItem}></ComponentList>
            </div>
            <div className="w-[40vw] h-[100%] bg-[gray]">
                <p>画布渲染</p>
                <div>
                    {defaultEditorData.components.map((item) => {
                        return <div key={item.id}>{getComponent(item)}</div>
                    })}
                    {defaultEditorData.components.map((item) => {
                        return <div key={item.id}>{item.props.text}</div>
                    })}
                </div>
            </div>
            <div className="flex-1 bg-[yellow] h-[100%]">right</div>
        </div>
    )
}

export default Editor
