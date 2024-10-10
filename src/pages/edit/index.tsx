import React, { FC, MouseEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType, OptionalLTextPropsType } from '../../components/LText'
import {
    addComponent,
    clearSelected,
    ComponentData,
    getCurrentElement,
    handleChangeComponent,
    handleSortAction,
    setActive,
} from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import ComponentList from './component/component-list'
import EditWrapper from './component/edit-wrapper'
import { Tabs } from 'antd'
import LayerList from './component/layer-list'
import EditGroup from './component/edit-group'
import PageSetting from './component/page-setting'

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
        console.log(props, '添加的值为')
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
        console.log(item)

        dispatch(handleChangeComponent(item))
    }

    const handleSort = (list: ComponentData[]) => {
        dispatch(handleSortAction(list))
    }

    return (
        <div className="flex text-center h-[100vh] bg-[#f2f2f5]">
            <div className="w-[20vw]  h-[100%] bg-[white] max-w-[20vw]">
                <ComponentList onItemClick={addItem}></ComponentList>
            </div>
            {/* TODO:这里的样式再进行琢磨一下，涉及定位之类的 */}
            <div className="flex flex-auto py-[20px]">
                <div className="flex flex-col items-center flex-auto">
                    <p>画布区域</p>
                    <div
                        className="canvas-area fixed overflow-hidden mt-[50px] max-h-[80vh] min-w-[20vw]"
                        onClick={handleCancelSelect}
                    >
                        <div
                            className="px-[10px] py-[10px] bg-[white] shadow-[#0000001f] shadow-md rounded-md overflow-auto"
                            style={defaultEditorData.page.props}
                        >
                            <div className="">
                                {defaultEditorData.components.map((item) => {
                                    return (
                                        <EditWrapper
                                            key={item.id}
                                            setActive={setActiveClick}
                                            id={item.id}
                                            props={item.props}
                                            onChange={handleChange}
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
                </div>
            </div>

            <div className="w-[20vw]  h-[100%] flex flex-col bg-[white] max-w-[20vw]">
                <Tabs type="card">
                    <Tabs.TabPane key={'1'} tab={'属性设置'}>
                        <div className=" h-[90vh] overflow-y-auto">
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
                                <EditGroup
                                    handleChange={handleChange}
                                ></EditGroup>
                            )}
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'2'} tab={'图层设置'}>
                        <LayerList
                            list={defaultEditorData.components}
                            change={handleChange}
                            setActive={setActiveClick}
                            currentElement={currentElement.id}
                            handleSort={handleSort}
                        ></LayerList>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'3'} tab={'页面设置'}>
                        <PageSetting
                            url={defaultEditorData.page.props.backgroundImage}
                        ></PageSetting>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Editor
