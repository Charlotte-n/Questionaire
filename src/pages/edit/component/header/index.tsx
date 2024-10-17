import React, { FC, useEffect } from 'react'
import { Button, Dropdown, MenuProps, message, Modal } from 'antd'
import { useParams, useNavigate, useBlocker } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import { saveTemplateAsync, setIsDirty } from '../../../../stores/editor'
import { menuList } from '../../../layout/header/config'
import { loginout } from '../../../../stores/user'

const EditHeader: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isDirty } = useAppSelector((state) => state.editorSlice)
    const { opName } = useAppSelector((state) => state.globalSlice)
    const buttonClassName = 'rounded-full mr-[25px]'
    const blocker = useBlocker(!isDirty)

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2') {
            dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }

    const saveWorkApi = () => {
        dispatch(saveTemplateAsync(id as string))
        dispatch(setIsDirty(false))
    }
    //router

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
        console.log(blocker.state, isDirty)
        // 当离开此页面的时候，如果没有保存就弹窗
        if (blocker.state === 'blocked') {
            Modal.confirm({
                title: '确认离开',
                content: '您有未保存的更改，是否确认离开？',
                onOk: () => {
                    blocker.proceed()
                },
                onCancel: () => {
                    blocker.reset()
                },
            })
        }
    }, [navigate, blocker])

    return (
        <div className="flex justify-between">
            <div
                onClick={() => {
                    navigate('/gxt/home')
                }}
            >
                返回
            </div>
            <div className="text-white">未命名的作品</div>

            <div className="flex justify-center items-center">
                <Button type="primary" className={buttonClassName}>
                    预览和设置
                </Button>

                <Button
                    type="primary"
                    className={buttonClassName}
                    onClick={() => saveWorkApi()}
                    loading={opName['saveWorks']}
                >
                    保存
                </Button>
                <Button type="primary" className={buttonClassName}>
                    发布
                </Button>
                <Dropdown.Button
                    className="rounded-full"
                    menu={{ items: menuList, onClick: onMenuClick }}
                >
                    merikle
                </Dropdown.Button>
            </div>
        </div>
    )
}

export default EditHeader
