import React, { FC } from 'react'
import { useAppSelector } from '../../stores'
import { LTextProps } from '../../components/LText'
import { ComponentData } from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'

function getComponent(c: ComponentData) {
    const { props, name }: { props: LTextProps; name: string } = c
    const { Component } = getComponentConfByType(name) as ComponentConfType
    return (
        <>
            <Component {...props}></Component>
        </>
    )
}
const Editor: FC = () => {
    const { defaultEditorData } = useAppSelector((state) => state.editorSlice)
    return (
        <div className="flex items-center text-center h-[100vh]">
            <div className="flex-1 bg-[red] h-[100%]">left</div>
            <div className="w-[700px] h-[100%]">
                <p>画布渲染</p>
                <div>
                    {defaultEditorData.components.map((item) => {
                        return <div>{getComponent(item)}</div>
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
