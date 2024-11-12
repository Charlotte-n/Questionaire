import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageProperties } from './commonproperties'
import { message } from 'antd'
import { cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import {
    getSingleTemplate,
    saveWorks,
    getChannelList,
    copyWork,
    getMySingleWork,
    updateName,
} from '../apis/work/work'
import { createAsyncThunkWrapper } from '../hoc/AsyncThunkWrapper'
import {
    channelDataType,
    ChannelType,
    singleEditorTypes,
} from './types/editorTypes'
import { ResponseType } from '../apis/interface'

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
    coverImg: string
    uuid: string
    subTitle: string
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
    cacheOldValues: any
    maxHistoryNumber: number
    isDirty: boolean
    channels: ChannelType[] | null
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
    backgroundColor: '',
    backgroundImage: '',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '560px',
}
export const initialState: EditorDataProps = {
    components: [],
    currentElement: 'version',
    page: {
        props: defaultPageProps,
        title: '',
        coverImg: '',
        uuid: '',
        subTitle: '未命名的作品',
    },
    copedComponent: undefined,
    histories: [],
    historyIndex: -1,
    cacheOldValues: null,
    maxHistoryNumber: 5,
    isDirty: false,
    channels: null,
}

//将这些内容放到redux里面管理
export const EditorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        addComponent(state, props): void {
            console.log(props.payload)

            state.components.push(props.payload)

            //添加添加历史记录
            state.histories.push({
                id: uuidv4(),
                componentId: props.payload.id,
                type: 'add',
                data: cloneDeep(props.payload),
            })
            state.isDirty = true
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

            state.isDirty = true
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

            const oldValue = Array.isArray(key)
                ? key.map((item) => component!.props[item])
                : component!.props[key]
            if (!state.cacheOldValues) {
                state.cacheOldValues = oldValue
            }

            if (Array.isArray(key)) {
                key.forEach((item, index) => {
                    component!.props[item] = value[index]
                })
            } else if (typeof key === 'string' && typeof value === 'string') {
                component!.props[key] = value
            }
        },
        pushHistoryAction(state, props) {
            const { id, key, value } = props.payload
            //TODO: 作为一个难点记录（困难点）
            pushHistory(state, { id, key, value })
        },
        handleSortAction(state, props) {
            state.components = props.payload
            state.isDirty = true
        },
        ChangePagePropsAction(state, props) {
            const { type } = props.payload
            console.log(props.payload)
            if (type === 'root') {
                //不要讲type放进去
                delete props.payload.type
                state.page = {
                    ...state.page,
                    ...props.payload,
                }
                console.log(state.page)
            } else {
                delete props.payload.type
                state.page.props = {
                    ...state.page.props,
                    ...props.payload,
                }
            }
            state.isDirty = true
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
            state.isDirty = true
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
            state.isDirty = true
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
                    //添加修改的历史记录
                    state.histories.push({
                        id: uuidv4(),
                        componentId: id,
                        type: 'change',
                        data: {
                            oldValue: [component.props['top']],
                            newValue: [
                                `${parseInt(component.props.top) - amount}px`,
                            ],
                            key: 'top',
                        },
                    })
                    component.props = {
                        ...component.props,
                        top: `${parseInt(component.props.top) - amount}px`,
                    }

                    break
                case 'down':
                    //添加修改的历史记录
                    state.histories.push({
                        id: uuidv4(),
                        componentId: id,
                        type: 'change',
                        data: {
                            oldValue: [component.props['top']],
                            newValue: [
                                `${parseInt(component.props.top) + amount}px`,
                            ],
                            key: 'top',
                        },
                    })
                    component.props = {
                        ...component.props,
                        top: `${parseInt(component.props.top) + amount}px`,
                    }
                    break
                case 'left':
                    //添加修改的历史记录
                    state.histories.push({
                        id: uuidv4(),
                        componentId: id,
                        type: 'change',
                        data: {
                            oldValue: [component.props['left']],
                            newValue: [
                                `${parseInt(component.props.left) - amount}px`,
                            ],
                            key: 'left',
                        },
                    })
                    component.props = {
                        ...component.props,
                        left: `${parseInt(component.props.left) - amount}px`,
                    }
                    break
                case 'right':
                    //添加修改的历史记录
                    state.histories.push({
                        id: uuidv4(),
                        componentId: id,
                        type: 'change',
                        data: {
                            oldValue: [component.props['left']],
                            newValue: [
                                `${parseInt(component.props.left) + amount}px`,
                            ],
                            key: 'left',
                        },
                    })
                    component.props = {
                        ...component.props,
                        left: `${parseInt(component.props.left) + amount}px`,
                    }
                    break
                default:
                    message.error('移动失败')
                    break
            }
            state.isDirty = true
        },

        /**
         * 撤销
         * @param state
         */
        undo(state) {
            if (state.historyIndex === -1) {
                state.historyIndex = state.histories.length - 1
            } else {
                state.historyIndex--
            }
            const history = state.histories[state.historyIndex]

            switch (history.type) {
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
                    modifyHistory(state, history, 'undo')
                    break
            }
        },

        /**
         * 重做
         * @param state
         */
        redo(state) {
            if (state.historyIndex === -1) {
                return
            }
            const history = state.histories[state.historyIndex]
            switch (history.type) {
                case 'add':
                    state.components.push(history.data as ComponentData)
                    break
                case 'delete':
                    state.components = state.components.filter(
                        (item) => item.id !== history.componentId,
                    )
                    break
                case 'change':
                    modifyHistory(state, history, 'redo')
                    break
                default:
                    break
            }
            state.historyIndex++
        },

        setIsDirty(state, props) {
            state.isDirty = props.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentTemplateAsync.fulfilled, (state, props) => {
            let prop = props.payload as singleEditorTypes
            if (prop) {
                state.components = prop.content?.components
                    ? prop.content.components.map(
                          (item: any, index: number) => {
                              return {
                                  ...item,
                                  isHidden: false,
                                  isLocked: false,
                                  layerName: item.layerName,
                              }
                          },
                      )
                    : []
                state.page.subTitle = prop.subTitle
                    ? prop.subTitle
                    : '未命名作品'
                state.page.title = prop.title ? prop.title : ''
                state.page.props = prop.content?.props ? prop.content.props : {}
                state.page.coverImg = prop.coverImg
                state.page.uuid = prop.uuid
            }
        })
        builder.addCase(saveTemplateAsync.fulfilled, (state, props) => {
            props.payload as ResponseType<singleEditorTypes>
        })
        builder.addCase(copyWorkAsync.fulfilled, (state, props) => {})
        builder.addCase(getMySingleWorkAsync.fulfilled, (state, props) => {
            let prop = props.payload as singleEditorTypes
            if (prop) {
                state.components = prop.content?.components
                    ? prop.content.components.map(
                          (item: any, index: number) => {
                              return {
                                  ...item,
                                  isHidden: false,
                                  isLocked: false,
                                  layerName: item.layerName,
                              }
                          },
                      )
                    : []
                state.page.props = prop.content?.props ? prop.content.props : {}
                state.page.coverImg = prop.coverImg
                state.page.uuid = prop.uuid
                //TODO:更新数据库数据后更新
                state.page.subTitle = prop.subTitle
                    ? prop.subTitle
                    : '未命名作品'
                state.page.title = prop.title ? prop.title : ''
            }
        })
        builder.addCase(getChannelListAsync.fulfilled, (state, props) => {
            const prop = props.payload as channelDataType
            state.channels = prop.list
        })

        builder.addCase(updateNameAsync.fulfilled, (state, props) => {
            const prop = props.payload as ResponseType<any>
            if (prop.code === 0) {
                message.success('更新成功')
                state.page.title = prop.data.title
            }
        })
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

const modifyHistory = (
    state: any,
    history: HistoriesType,
    type: 'redo' | 'undo',
) => {
    const { key, newValue, oldValue } = history.data as HistoryDataType
    const component = getCom(state.components, history.componentId)
    if (!component) {
        message.error('修改失败')
        return
    }
    if (Array.isArray(key)) {
        key.forEach((item, index) => {
            component!.props[item] =
                type === 'redo' ? newValue[index] : oldValue[index]
        })
    } else {
        component!.props[key] = type === 'redo' ? newValue : oldValue
    }
}

const pushHistory = (
    state: any,
    {
        id,
        key,
        value,
    }: {
        id: string
        key: string | string[]
        value: string | string[]
    },
) => {
    //当有过回滚的记录时，清空后面的记录
    if (state.historyIndex !== -1) {
        state.histories = state.histories.slice(0, state.historyIndex)
        state.historyIndex = -1
    }

    //最大保存的历史记录数目
    if (state.histories.length > state.maxHistoryNumber) {
        state.histories.shift()
        return
    }

    state.histories.push({
        id: uuidv4(),
        componentId: id,
        type: 'change',
        data: {
            oldValue: state.cacheOldValues,
            newValue: value,
            key: key,
        },
    })
    state.cacheOldValues = ''
}

//Thunk
export const getCurrentTemplateAsync = createAsyncThunkWrapper<any, any>(
    'editor/getCurrentTemplateAsync',
    getSingleTemplate,
    false,
)

export const saveTemplateAsync = createAsyncThunkWrapper<any, any>(
    'editor/saveTemplateAsync',
    saveWorks,
    true,
)

export const getChannelListAsync = createAsyncThunkWrapper<
    channelDataType,
    string
>('editor/getChannelListAsync', getChannelList, false)

export const copyWorkAsync = createAsyncThunkWrapper<any, string>(
    'editor/copyWorkAsync',
    copyWork,
    false,
)

export const getMySingleWorkAsync = createAsyncThunkWrapper<any, string>(
    'editor/getMySingleWorkAsync',
    getMySingleWork,
    false,
)

export const updateNameAsync = createAsyncThunkWrapper<any, any>(
    'editor/updateNameAsync',
    updateName,
    true,
)

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
    undo,
    redo,
    pushHistoryAction,
    setIsDirty,
} = EditorSlice.actions
export default EditorSlice.reducer
