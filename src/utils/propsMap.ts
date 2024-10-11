//点击画布组件与右边来进行映射
import { LTextPropsType } from '../components/LText'
import PropsComponent from '../pages/components/PropComponent'
export interface PropToForm {
    component: string
    value?: string
}

export type PropToForms = {
    [p in keyof LTextPropsType]?: PropToForm
}
//测试数据
export const mapPropsToForms: PropToForms = {
    text: {
        component: 'a-input',
    },
}

type PropsComponentMap = {
    [key: string]: React.FC<{
        onChange: (item: {
            key: string | string[]
            value: string | string[]
            id: string
        }) => void
        subName: string
    }>
}

export const propsComponentMap: PropsComponentMap = {
    PropsComponentForLText: PropsComponent,
}
