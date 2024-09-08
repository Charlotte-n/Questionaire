import React, { FC, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType } from '../../components/LText'
import {
    addComponent,
    ComponentData,
    getCurrentElement,
    setActive,
} from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import ComponentList from './component/component-list'
import EditWrapper from './component/edit-wrapper'

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
    const currentElement = useAppSelector(getCurrentElement)
    const dispatch = useAppDispatch()
    function addItem(props: any) {
        dispatch(addComponent(props))
    }
    function setActiveClick(id: string) {
        dispatch(setActive(id))
        console.log(currentElement)
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
                        return (
                            <EditWrapper
                                key={item.id}
                                setActive={setActiveClick}
                                id={item.id}
                                active={currentElement?.id === item.id}
                            >
                                {{
                                    content: <div>{getComponent(item)}</div>,
                                }}
                            </EditWrapper>
                        )
                    })}

                    {defaultEditorData.components.map((item) => {
                        return <div key={item.id}>{item.props.text}</div>
                    })}
                </div>
            </div>
            <div className="flex-1  h-[100%]">
                <p>组件属性</p>
                <div className="">
                    {currentElement && JSON.stringify(currentElement.props)}
                </div>
            </div>
        </div>
    )
}

export default Editor
