import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType } from '../../components/LText'
import {
    addComponent,
    clearSelected,
    ComponentData,
    getCurrentElement,
    setActive,
} from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import ComponentList from './component/component-list'
import EditWrapper from './component/edit-wrapper'
import PropsTable from './component/props-table'

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
    function setActiveClick(event: MouseEvent, id: string) {
        event.stopPropagation()
        dispatch(setActive(id))
    }
    function handleCancelSelect() {
        console.log(123)

        dispatch(clearSelected())
    }
    return (
        <div className="flex items-center text-center h-[100vh] bg-[#f2f2f5]">
            <div className="flex-1  h-[100%] bg-[white]">
                <ComponentList onItemClick={addItem}></ComponentList>
            </div>
            <div
                className="w-[45vw] h-[100%] flex justify-center items-center overflow-hidden"
                onClick={handleCancelSelect}
            >
                <div className="w-[80%] h-[80%] px-[10px] py-[10px] bg-[white] shadow-[#0000001f] shadow-md rounded-md overflow-auto">
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
                                        content: (
                                            <div>{getComponent(item)}</div>
                                        ),
                                    }}
                                </EditWrapper>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex-1  h-[100%] flex flex-col py-[20px] px-[20px] bg-[white]">
                <p>组件属性</p>
                <div className="mt-[20px]">
                    <PropsTable {...currentElement}></PropsTable>
                </div>
            </div>
        </div>
    )
}

export default Editor
