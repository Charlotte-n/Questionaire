//点击画布组件与右边来进行映射
import { LTextPropsType } from '../components/LText'
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
