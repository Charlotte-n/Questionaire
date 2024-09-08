//组件的声明
import { FC } from 'react'
import LTextConf, { LTextPropsType } from './LText'

export type ComponentProps = LTextPropsType
export type ComponentConfType = {
    title: string
    name: string
    Component: FC<ComponentProps>
    defaultProps: ComponentProps
}

//全部组件配置列表
const ComponentConfList: ComponentConfType[] = [LTextConf]

//根据组件类型来获取组件配置
export function getComponentConfByType(name: string) {
    return ComponentConfList.find((item) => item.name === name)
}
