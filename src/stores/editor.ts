import { createSlice } from '@reduxjs/toolkit'

export interface EditorDataProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[]
    // 当前编辑的是哪个元素，uuid
    currentElement: string
    // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}
interface ComponentData {
    // 这个元素的 属性，属性请详见下面
    props: { [key: string]: any }
    // id，uuid v4 生成
    id: string
    // 业务组件库名称 l-text，l-image 等等
    name: string
}

export const defaultEditorData: EditorDataProps = {
    components: [
        {
            props: {
                text: 'Hello World',
            },
            id: 'version',
            name: 'text',
        },
        {
            props: {
                text: 'Hello Worldnihao',
            },
            id: 'version1',
            name: 'text',
        },
        {
            props: {
                text: 'Hello Worldbuhao',
            },
            id: 'version2',
            name: 'text',
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
        //添加元素
        push() {},
        //删除元素
        delete() {},
    },
})

export const { push } = EditorSlice.actions
export default EditorSlice.reducer
