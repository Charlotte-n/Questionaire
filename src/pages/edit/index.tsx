import React, { FC, MouseEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType, OptionalLTextPropsType } from '../../components/LText'
import {
    addComponent,
    clearSelected,
    ComponentData,
    getCurrentElement,
    handleChangeComponent,
    setActive,
} from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import ComponentList from './component/component-list'
import EditWrapper from './component/edit-wrapper'
import PropsTable from './component/props-table'
import { List, Modal, Tabs } from 'antd'
import LayerList from './component/layer-list'

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

    const addItem = (props: any) => {
        dispatch(addComponent(props))
    }
    const setActiveClick = (event: MouseEvent, id: string) => {
        event.stopPropagation()
        dispatch(setActive(id))
    }
    const handleCancelSelect = () => {
        // dispatch(clearSelected())
    }
    const handleChange = (
        item: OptionalLTextPropsType & {
            id: string
            key?: string
            value?: any
        },
    ) => {
        dispatch(handleChangeComponent(item))
    }

    return (
        <div className="flex items-center text-center h-[100vh] bg-[#f2f2f5]">
            <div className="flex-1  h-[100%] bg-[white]">
                <ComponentList onItemClick={addItem}></ComponentList>
            </div>
            <div
                className="w-[60vw] h-[100%] flex justify-center items-center overflow-hidden"
                onClick={handleCancelSelect}
            >
                <div className="w-[40%] h-[80%] px-[10px] py-[10px] bg-[white] shadow-[#0000001f] shadow-md rounded-md overflow-auto">
                    <div>
                        {defaultEditorData.components.map((item) => {
                            return (
                                <EditWrapper
                                    key={item.id}
                                    setActive={setActiveClick}
                                    id={item.id}
                                >
                                    {{
                                        content: (
                                            <div
                                                className={
                                                    !item.isHidden &&
                                                    currentElement?.id ===
                                                        item.id
                                                        ? 'border-[1px] border-[#1890ff] border-solid'
                                                        : ''
                                                }
                                            >
                                                {getComponent(item)}
                                            </div>
                                        ),
                                    }}
                                </EditWrapper>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="flex-1  h-[100%] flex flex-col bg-[white]">
                <Tabs type="card">
                    <Tabs.TabPane key={'1'} tab={'属性设置'}>
                        <div className="mt-[20px] pl-[10px]">
                            {currentElement.isBlock ? (
                                <div className="flex flex-col items-center justify-center">
                                    <img
                                        src={`/public/suoding`}
                                        className="w-[200px] h-[200px]"
                                        alt="图片被锁定了"
                                    />
                                    <span>该元素被锁定了</span>
                                </div>
                            ) : (
                                <PropsTable
                                    {...currentElement}
                                    onChange={handleChange}
                                ></PropsTable>
                            )}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'2'} tab={'图层设置'}>
                        <LayerList
                            list={defaultEditorData.components}
                            change={handleChange}
                            setActive={setActiveClick}
                            currentElement={currentElement.id}
                        ></LayerList>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'3'} tab={'页面设置'}>
                        <div>页面设置</div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Editor
