import { createSlice } from '@reduxjs/toolkit'
import { OptionalLTextPropsType } from '../components/LText'

export interface EditorDataProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[]
    // 当前编辑的是哪个元素，uuid
    currentElement: string
    // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}
export interface ComponentData {
    // 这个元素的 属性，属性请详见下面
    props: any
    // id，uuid v4 生成
    id: string
    // 业务组件库名称 l-text，l-image 等等
    name: string
    //是否隐藏
    isHidden: boolean
    //是否显示
    isBlock: boolean
}

export const defaultEditorData: EditorDataProps = {
    components: [
        {
            props: {
                text: 'Hello World',
                fontSize: '20px',
                color: 'red',
            },
            id: 'version',
            name: 'l-text',
            isHidden: false,
            isBlock: false,
        },
        {
            props: {
                text: 'Hello Worldnihao',
            },
            id: 'version1',
            name: 'l-text',
            isHidden: false,
            isBlock: false,
        },
        {
            props: {
                text: 'Hello Worldbuhao',
            },
            id: 'version2',
            name: 'l-text',
            isHidden: false,
            isBlock: false,
        },
    ],
    currentElement: 'version',
}
//将这些内容放到redux里面管理
export const EditorSlice = createSlice({
    name: 'editor',
    initialState: {
        defaultEditorData,
    },
    reducers: {
        addComponent(state, props): void {
            const newComponent: ComponentData = {
                id: Date.now().toString(),
                name: 'l-text',
                props: props.payload as OptionalLTextPropsType,
                isBlock: false,
                isHidden: false,
            }
            state.defaultEditorData.components.push(newComponent)
        },
        setActive(state, props) {
            state.defaultEditorData.currentElement = props.payload
        },
        clearSelected(state) {
            state.defaultEditorData.currentElement = ''
        },
        handleChangeComponent(state, props) {
            const { id } = props.payload
            //根据id找
            const component = state.defaultEditorData.components.find(
                (item) => item.id === id,
            )
            if (props.payload.isRoot) {
                ;(component as any)[props.payload.key] = props.payload.value
                return
            }
            state.defaultEditorData.components =
                state.defaultEditorData.components.map((item) => {
                    return item.id === props.payload.id
                        ? {
                              ...item,
                              props: { ...item.props, ...props.payload },
                          }
                        : item
                })
        },
    },
})
// 定义 selector
export const getCurrentElement = (state: any) => {
    return state.editorSlice.defaultEditorData.components.find(
        (item: ComponentData) =>
            item.id === state.editorSlice.defaultEditorData.currentElement,
    )
}

export const { addComponent, setActive, clearSelected, handleChangeComponent } =
    EditorSlice.actions
export default EditorSlice.reducer
