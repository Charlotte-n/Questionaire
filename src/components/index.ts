//组件的声明
import { FC } from 'react'
import LTextConf, { LTextProps } from './LText'

export type ComponentProps = LTextProps
export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentProps>
    defaultProps: ComponentProps
}

//全部组件配置列表
const ComponentConfList: ComponentConfType[] = [LTextConf]

//根据组件类型来获取组件配置
export function getComponentConfByType(type: string) {
    return ComponentConfList.find((item) => item.type === type)
}
