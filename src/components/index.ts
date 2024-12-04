import LTextConf, { LTextPropsType } from './LText'
import LImageConf, { LImagePropsType } from './LImage'
import LShapeConf from './LShape'

export type ComponentProps = LTextPropsType | LImagePropsType

export type ComponentConfType = {
    title: string
    name: string
    Component: any
    ChangePropComponent: string //修改属性组件
    defaultProps: ComponentProps | {}
}

//全部组件配置列表
const ComponentConfList: ComponentConfType[] = [
    LTextConf,
    LImageConf,
    LShapeConf,
]

//根据组件类型来获取组件配置
export function getComponentConfByType(name: string) {
    return ComponentConfList.find((item) => item.name === name)
}
