import React, { FC } from 'react'
import { Button, Dropdown, MenuProps, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import { menuList } from '../../../layout/header/config'
import { loginout } from '../../../../stores/user'
import { useSaveWork } from './hooks/useSaveWork'
import { takeScreenshotAndUpload } from '../../../utils/util'
import { ChangePagePropsAction } from '../../../../stores/editor'
import { publishMyWork } from '../../../../apis/work/work'

const EditHeader: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { saveWorkApi } = useSaveWork()
    const { opName } = useAppSelector((state) => state.globalSlice)
    const buttonClassName = 'rounded-full mr-[25px]'
    const { id } = useParams()

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2') {
            dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }

    const handelSaveWork = () => {
        saveWorkApi()
    }

    const publish = async () => {
        const editWrapper = document.querySelector(
            '.edit-canvas',
        ) as HTMLElement

        const res = await takeScreenshotAndUpload(editWrapper)
        if (res) {
            //更新coverImg
            dispatch(ChangePagePropsAction({ coverImg: res.url }))
            //保存
            saveWorkApi()
            //发布
            publishMyWork(id as string)
        }
    }
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
                    onClick={() => handelSaveWork()}
                    loading={opName['saveWorks']}
                >
                    保存
                </Button>
                <Button
                    type="primary"
                    className={buttonClassName}
                    onClick={() => publish()}
                    loading={opName['uploadFile']}
                >
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
