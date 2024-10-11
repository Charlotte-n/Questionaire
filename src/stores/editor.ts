import { createSlice } from '@reduxjs/toolkit'
import { ImageProperties } from './commonproperties'
import { message } from 'antd'
import { cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'

interface HistoryDataType {
    oldValue: string[]
    newValue: string[]
    key: string
}
interface HistoriesType {
    id: string
    componentId: string
    type: 'add' | 'delete' | 'change'
    data: ComponentData | HistoryDataType
    index?: number
}
interface PageDataType {
    props: any
    title: string
}
export interface EditorDataProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[]
    // 当前编辑的是哪个元素，uuid
    currentElement: string
    // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
    page: PageDataType
    copedComponent: ComponentData | null | undefined
    histories: HistoriesType[]
    historyIndex: number
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
    layerName: string
}

const defaultPageProps = {
    backgroundColor: 'red',
    backgroundImage:
        'url("https://merikle-backend.oss-cn-beijing.aliyuncs.com/test/09mjkt.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '560px',
}
export const initialState: EditorDataProps = {
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
            layerName: '图层一',
        },
        {
            props: {
                text: 'Hello Worldnihao',
            },
            id: 'version1',
            name: 'l-text',
            isHidden: false,
            isBlock: false,
            layerName: '图层二',
        },
        {
            props: {
                text: 'Hello Worldbuhao',
            },
            id: 'version2',
            name: 'l-text',
            isHidden: false,
            isBlock: false,
            layerName: '图层三',
        },
        {
            props: {
                ...ImageProperties,
                url: 'https://merikle-backend.oss-cn-beijing.aliyuncs.com/test/09mjkt.png',
            },
            id: 'version3',
            name: 'l-image',
            isHidden: false,
            isBlock: false,
            layerName: '图层四',
        },
    ],
    currentElement: 'version',
    page: {
        props: defaultPageProps,
        title: '',
    },
    copedComponent: undefined,
    histories: [],
    historyIndex: -1,
}

//将这些内容放到redux里面管理
export const EditorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        addComponent(state, props): void {
            state.components.push(props.payload)

            //添加添加历史记录
            state.histories.push({
                id: uuidv4(),
                componentId: props.payload.id,
                type: 'add',
                data: cloneDeep(props.payload),
            })
        },
        setActive(state, props) {
            const { id, type } = props.payload
            //如果是页面的话就设置currentElement为页面
            if (type !== 'element') {
                state.currentElement = 'page'
                return
            }
            state.currentElement = id
        },
        clearSelected(state) {
            state.currentElement = ''
        },
        handleChangeComponent(state, props) {
            const { id, key, value } = props.payload
            const component = getCom(state.components, id)
            if (!component) {
                message.error('修改失败')
                return
            }
            const oldValue = Array.isArray(key)
                ? key.map((item) => component!.props[item])
                : component!.props[key]
            if (props.payload.isRoot) {
                ;(component as any)[key] = props.payload.value
                if (props.payload.key === 'isHidden') {
                    component!.props = {
                        ...component!.props,
                        visibility: props.payload.value ? 0 : 1,
                        opacity: props.payload.value ? 0 : 1,
                    }
                }
                return
            }

            //添加修改的历史记录
            state.histories.push({
                id: uuidv4(),
                componentId: id,
                type: 'change',
                data: {
                    oldValue: oldValue,
                    newValue: value,
                    key: key,
                },
            })
            if (Array.isArray(key)) {
                key.forEach((item, index) => {
                    component!.props[item] = value[index]
                })
            } else {
                component!.props[key] = value
            }
        },
        handleSortAction(state, props) {
            state.components = props.payload
        },
        ChangePagePropsAction(state, props) {
            state.page.props = {
                ...state.page.props,
                ...props.payload,
            }
        },
        copyComponent(state, props) {
            const component = getCom(state.components, props.payload.id)
            if (!component) {
                message.error('拷贝图层失败')
                return
            }
            message.success('拷贝图层成功')
        },
        pasteComponent(state, props) {
            const { id } = props.payload
            const component = getCom(state.components, id)
            if (!component) {
                message.error('粘贴失败')
                return
            }
            const pastedCom = cloneDeep(component)
            pastedCom!.id = uuidv4()
            pastedCom!.layerName = `${pastedCom!.layerName}副本`
            state.components.push(pastedCom)

            //添加新增历史记录
            state.histories.push({
                id: uuidv4(),
                componentId: pastedCom!.id,
                type: 'add',
                data: cloneDeep(pastedCom),
            })
            message.success('粘贴成功')
        },
        deleteComponent(state, props) {
            const { id } = props.payload
            const component = getCom(state.components, id)
            const componentIndex = state.components.findIndex(
                (item) => item.id === id,
            )
            if (!component) {
                message.error('删除失败')
                return
            }
            state.components = state.components.filter((item) => item.id !== id)

            //添加删除历史记录
            state.histories.push({
                id: uuidv4(),
                componentId: id,
                type: 'delete',
                data: component,
                index: componentIndex,
            })
            message.success('删除成功')
        },
        moveComponent(state, props) {
            const { id, amount, type } = props.payload
            const component = getCom(state.components, id)
            if (!component) {
                message.error('移动失败')
                return
            }
            switch (type) {
                case 'up':
                    component.props = {
                        ...component.props,
                        top: `${parseInt(component.props.top) - amount}px`,
                    }
                    break
                case 'down':
                    component.props = {
                        ...component.props,
                        top: `${parseInt(component.props.top) + amount}px`,
                    }
                    break
                case 'left':
                    component.props = {
                        ...component.props,
                        left: `${parseInt(component.props.left) - amount}px`,
                    }
                    break
                case 'right':
                    component.props = {
                        ...component.props,
                        left: `${parseInt(component.props.left) + amount}px`,
                    }
                    break
                default:
                    message.error('移动失败')
                    break
            }
        },
        undo(state, props) {
            if (state.historyIndex === -1) {
                state.historyIndex = state.histories.length - 1
            } else {
                state.historyIndex--
            }
            const history = state.histories[state.historyIndex]
            const { type } = props.payload
            switch (type) {
                case 'add':
                    state.components = state.components.filter(
                        (item) => item.id !== history.componentId,
                    )
                    break
                case 'delete':
                    state.components.splice(
                        history.index as number,
                        0,
                        history.data as ComponentData,
                    )
                    break
                case 'change':
                    const { key, oldValue, newValue } =
                        history.data as HistoryDataType
                    const component = getCom(
                        state.components,
                        history.componentId,
                    )
                    if (Array.isArray(key)) {
                        key.forEach((item, index) => {
                            component!.props[item] = oldValue[index]
                        })
                    } else {
                        component!.props[key] = oldValue
                    }
                    break
            }
        },
    },
})

// 定义 selector
export const getCurrentElement = (state: any) => {
    return state.editorSlice.components.find(
        (item: ComponentData) => item.id === state.editorSlice.currentElement,
    )
}

const getCom = (components: ComponentData[], id: string) => {
    return components.find((item: ComponentData) => item.id === id)
}

export const {
    addComponent,
    setActive,
    clearSelected,
    handleChangeComponent,
    handleSortAction,
    ChangePagePropsAction,
    copyComponent,
    pasteComponent,
    deleteComponent,
    moveComponent,
} = EditorSlice.actions
export default EditorSlice.reducer
