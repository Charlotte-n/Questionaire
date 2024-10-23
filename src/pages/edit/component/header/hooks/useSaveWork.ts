import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { saveTemplateAsync, setIsDirty } from '../../../../../stores/editor'
import { useNavigate, useParams, useBlocker } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../stores'

export const useSaveWork = (sideEffect = false) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { isDirty, components, page } = useAppSelector(
        (state) => state.editorSlice,
    )
    const blocker = useBlocker(isDirty)

    const saveWorkApi = () => {
        dispatch(
            saveTemplateAsync({
                id,
                data: {
                    content: {
                        components,
                        props: page.props,
                    },
                    coverImg: page.props.coverImg,
                    title: page.props.title,
                },
            }),
        )
        dispatch(setIsDirty(false))
    }

    if (!sideEffect) {
        //定时保存
        useEffect(() => {
            const timer = setInterval(() => {
                if (isDirty) {
                    saveWorkApi()
                }
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        }, [])

        useEffect(() => {
            // 当离开此页面的时候，如果没有保存就弹窗
            if (blocker.state === 'blocked') {
                Modal.confirm({
                    title: '确认离开',
                    content: '您有未保存的更改，是否确认离开？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        blocker.proceed()
                    },
                    onCancel: () => {
                        blocker.reset()
                    },
                })
            }
        }, [navigate, blocker])
    }

    return {
        saveWorkApi,
    }
}
