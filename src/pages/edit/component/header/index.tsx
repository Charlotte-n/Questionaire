import React, { FC, useState } from 'react'
import { Button, Dropdown, MenuProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../stores'
import { menuList } from '../../../layout/header/config'
import { loginout } from '../../../../stores/user'
import { useSaveWork } from './hooks/useSaveWork'
import { usePublish } from './hooks/usePublish'
import PublishModal from '../publish-modal'

interface Props {
    handleOpenPreviewForm: () => void
}
const EditHeader: FC<Props> = ({ handleOpenPreviewForm }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { saveWorkApi } = useSaveWork()
    const { opName } = useAppSelector((state) => state.globalSlice)
    const buttonClassName = 'rounded-full mr-[25px]'
    const { publish } = usePublish()
    const [publishModalVisible, setPublishModalVisible] = useState(false)

    const handlePublishVisible = () => {
        setPublishModalVisible(true)
    }

    const handlePublishVisibleCancel = () => {
        setPublishModalVisible(false)
    }

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2') {
            dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                navigate('/gxt/login')
            }, 1000)
        }
    }

    const handelSaveWork = () => {
        handlePublishVisible()
        saveWorkApi()
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
                <Button
                    type="primary"
                    className={buttonClassName}
                    onClick={handleOpenPreviewForm}
                >
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
                    onClick={() => publish(handlePublishVisible)}
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
            <PublishModal
                isModalOpen={publishModalVisible}
                onClose={handlePublishVisibleCancel}
            />
        </div>
    )
}

export default EditHeader
