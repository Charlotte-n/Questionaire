import { FC, MouseEvent, useCallback, useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores'
import { LTextPropsType } from '../../components/LText'
import {
    addComponent,
    clearSelected,
    ComponentData,
    getCurrentElement,
    getMySingleWorkAsync,
    handleChangeComponent,
    handleSortAction,
    pushHistoryAction,
    setActive,
} from '../../stores/editor'
import { ComponentConfType, getComponentConfByType } from '../../components'
import EditWrapper from './children/edit-wrapper'
import { Layout, Tabs } from 'antd'
import LayerList from './children/right-edit/layer-list'
import EditGroup from './children/right-edit/edit-group'
import PageSetting from './children/right-edit/page-setting'
import { initHotKeys } from '../../plugins/hotKeys'
import HistoryArea from './children/edit-wrapper/component/history-area'
import LeftEditor from './children/left-edit'
import { debounce } from '../../utils/util'
import initContextMenu from './children/edit-wrapper/component/context-menu/initContextMenu'
import { useParams } from 'react-router-dom'
import EditHeader from './component/header'
import PreviewForm from './component/preview-form'
import CanvasScale from './component/canvas-scale'
import { useDrop } from 'react-dnd'

function getComponent(c: ComponentData) {
    const { props, name }: { props: LTextPropsType; name: string } = c
    const { Component } = getComponentConfByType(name) as ComponentConfType
    return (
        <>
            <Component {...props}></Component>
        </>
    )
}

const Editor: FC = () => {
    const {
        components,
        page,
        currentElement: currentElementID,
    } = useAppSelector((state) => state.editorSlice)
    const currentElement = useAppSelector(getCurrentElement)
    const dispatch = useAppDispatch()
    const [activeKey, setActiveKey] = useState('1')
    //获取router的id
    const { id } = useParams<{ id: string }>()
    const [previewFormVisible, setPreviewFormVisible] = useState(false)
    const areaRef = useRef<HTMLDivElement>(null)
    const originalHeight = useRef<number>(0)
    const originalWidth = useRef<number>(0)


    const handleClosePreviewForm = () => {
        setPreviewFormVisible(false)
    }

    const handleOpenPreviewForm = () => {
        setPreviewFormVisible(true)
    }

    const addItem = (props: any) => {
        dispatch(addComponent(props))
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'left-editor',
        collect: (monitor: any) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        drop: (item: any, monitor) => {
            try {
                const dropResult = monitor.getClientOffset()
                const areaRefCurrent = areaRef.current?.getBoundingClientRect()
                const areaLeft = areaRefCurrent?.left || 0
                const areaTop = areaRefCurrent?.top || 0
                const left = (dropResult?.x || 0) - areaLeft
                const top = (dropResult?.y || 0) - areaTop
                const newItem = {
                    ...item,
                    id: item.id + Date.now(),
                    props: {
                        ...item.props,
                        left: left < 0 ? 0 : left > areaLeft + (areaRefCurrent?.width || 0) ? areaLeft + (areaRefCurrent?.width || 0) - 100 : left,
                        top: top < 0 ? 0 : top > areaTop + (areaRefCurrent?.height || 0) ? areaTop + (areaRefCurrent?.height || 0) - 100 : top,
                    }
                }
                addItem(newItem)
                console.log('newItem', newItem)
            } catch (error) {
                console.log('error', error)
            }
        }
    }))


    const setActiveClick = (
        { id, type }: { id?: string; type: string },
        e?: MouseEvent,
    ) => {
        e && e.stopPropagation()
        dispatch(
            setActive({
                id,
                type,
            }),
        )
    }

    const handleCancelSelect = () => {
        dispatch(clearSelected())
    }


    //TODO:debounceHandleChange函数。如果debounceHandleChange的定义每次调用handleChange时都重新创建，那么防抖功能（debounce function）就不会正常工作，因为每次都会产生一个新的debounceHandleChange实例，每个实例都有自己的定时器。
    const debounceHandleChange = useCallback(
        debounce(
            (item: {
                id: string
                key: string | string[]
                value: string | string[]
            }) => {
                dispatch(pushHistoryAction(item))
            },
            1000,
        ),
        [],
    )

    const handleChange = async (item: {
        id: string
        key: string | string[]
        value: string | string[]
    }) => {
        dispatch(handleChangeComponent(item))
        debounceHandleChange(item)
    }

    const handleSort = (list: ComponentData[]) => {
        dispatch(handleSortAction(list))
    }

    //更新激活的activeKey
    const handleChangeTab = (key: string) => {
        switch (key) {
            case '1':
                handleCancelSelect()
                setActiveKey('1')
                break
            case '2':
                handleCancelSelect()
                setActiveKey('2')
                break
            case '3':
                setActiveKey('3')
                dispatch(
                    setActive({
                        type: 'page',
                    }),
                )
                break
            default:
                break
        }
    }

    //切换到页面设置tab
    const handleChangePageTab = (e: MouseEvent) => {
        e.stopPropagation()
        setActiveKey('3')
        setActiveClick({ type: 'page' })
    }

    initHotKeys()
    initContextMenu(setActiveClick as any)

    useEffect(() => {
        dispatch(getMySingleWorkAsync(id as string))
        // 获取画布初始宽高
        if (areaRef.current) {
            originalWidth.current = areaRef.current.offsetWidth
            originalHeight.current = areaRef.current.offsetHeight
        }
    }, [])

    //获取scale数据
    const getScaleNumber = (scale: number) => {
        const areaHtml = areaRef.current
        if (!areaHtml) return

        const scaleNumber = scale / 100

        areaHtml.style.transform = `scale(${scaleNumber})`
        areaHtml.style.transformOrigin = 'center center'

        if (!originalWidth.current) {
            originalWidth.current = areaHtml.offsetWidth
        }
        if (!originalHeight.current) {
            originalHeight.current = areaHtml.offsetHeight
        }
        const width = originalWidth.current * scaleNumber
        const height = originalHeight.current * scaleNumber
        Object.assign(areaHtml.style, {
            width: `${width}px`,
            height: `${height}px`
        })
        document.querySelectorAll('.edit-wrapper').forEach((item) => {
            const componentHtml = item as HTMLDivElement
            if (!componentHtml.dataset.top) {
                componentHtml.dataset.top = componentHtml.style.top
            }
            const topValue = parseInt(componentHtml.dataset.top) || 0
            componentHtml.style.top = `${topValue * scaleNumber}px`
        })
    }

    return (
        <Layout className='h-[100vh] overflow-hidden'>
            <Layout.Header>
                <EditHeader handleOpenPreviewForm={handleOpenPreviewForm} />
            </Layout.Header>
            <Layout.Content>
                <div className="flex text-center h-[100vh] bg-[#f2f2f5]">
                    {/* 左侧 */}
                    <div className="w-[16vw] px-[15px] pt-[20px]  h-[100%] bg-[white] max-w-[20vw]">
                        <LeftEditor />
                    </div>
                    {/* 中间画布 */}
                    {/* TODO:这里的样式再进行琢磨一下，涉及定位之类的 */}
                    <div className="flex flex-auto py-[20px]">
                        <div className="flex flex-col items-center flex-auto relative" onClick={() => handleCancelSelect()}>
                            <p>画布区域</p>
                            <HistoryArea />
                            <div
                                ref={areaRef}
                                className={`canvas-area fixed overflow-hidden mt-[50px] max-h-[80vh] min-w-[375px]  cursor-pointer rounded-md`}
                                onClick={(e: MouseEvent) => handleChangePageTab(e)}

                            >
                                <div
                                    className={`edit-canvas px-[10px]  py-[10px] bg-[white] shadow-[#0000001f] shadow-md min-h-[200px] overflow-auto  ${currentElementID === 'page' || isOver ? 'border-[2px] border-[#1890ff] border-solid' : ''}`}
                                    style={page.props}
                                    ref={drop}

                                >

                                    <div className="" >
                                        {components.map((item) => {
                                            return (
                                                <EditWrapper

                                                    key={item.id}
                                                    setActive={setActiveClick}
                                                    id={item.id}
                                                    props={item.props}
                                                    onChange={handleChange}
                                                    onTabChange={handleChangeTab}
                                                    tabActiveKey={activeKey}
                                                    isActive={
                                                        currentElement?.id ===
                                                        item.id
                                                    }
                                                >
                                                    {{
                                                        content: (
                                                            <div
                                                                className={
                                                                    !item.isHidden &&
                                                                        currentElement?.id ===
                                                                        item.id
                                                                        ? 'border-[1px] border-[#1890ff] border-solid'
                                                                        : 'hover:border-[1px] hover:border-dashed cursor-pointer'
                                                                }
                                                            >
                                                                {getComponent(
                                                                    item,
                                                                )}
                                                            </div>
                                                        ),
                                                    }}
                                                </EditWrapper>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* 放大缩小画布 */}
                            <div className='absolute bottom-[80px] right-[20px]'>
                                <CanvasScale getScaleNumber={getScaleNumber} />
                            </div>

                        </div>
                    </div>
                    {/* 右侧设置属性 */}
                    <div className="w-[20vw]  h-[100%] flex flex-col bg-[white] max-w-[20vw]">
                        <Tabs
                            type="card"
                            defaultActiveKey={
                                currentElementID === 'page' ? '3' : '1'
                            }
                            onChange={handleChangeTab}
                            activeKey={activeKey}
                        >
                            <Tabs.TabPane key={'1'} tab={'属性设置'}>
                                <div className=" h-[90vh] overflow-y-auto">
                                    {!currentElement ? (
                                        <div>没有选中元素</div>
                                    ) : currentElement.isBlock ? (
                                        <div className="flex flex-col items-center justify-center">
                                            <img
                                                src={`/public/suoding`}
                                                className="w-[200px] h-[200px]"
                                                alt="图片被锁定了"
                                            />
                                            <span>该元素被锁定了</span>
                                        </div>
                                    ) : (
                                        <EditGroup
                                            handleChange={handleChange}
                                        ></EditGroup>
                                    )}
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={'2'} tab={'图层设置'}>
                                <LayerList
                                    list={components}
                                    change={handleChange}
                                    setActive={setActiveClick}
                                    currentElement={
                                        currentElement && currentElement.id
                                    }
                                    handleSort={handleSort}
                                ></LayerList>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={'3'} tab={'页面设置'}>
                                <PageSetting
                                    url={page.props.backgroundImage}
                                ></PageSetting>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </Layout.Content>

            <PreviewForm
                drawerVisible={previewFormVisible}
                onClose={handleClosePreviewForm}
            ></PreviewForm>

        </Layout>
    )
}

export default Editor
