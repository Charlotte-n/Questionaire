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
        saveWorkApi()
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center">
                <div
                    onClick={() => {
                        navigate('/gxt/home', { replace: true })
                    }}
                    className="cursor-pointer"
                >
                    <svg
                        t="1729652009286"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="12586"
                        width="50"
                        height="50"
                    >
                        <path
                            d="M270.628571 307.2c21.942857-7.314286 51.2 0 65.828572 14.628571L512 533.942857l175.542857-204.8c14.628571-21.942857 43.885714-21.942857 65.828572-14.628571 21.942857 7.314286 36.571429 29.257143 36.571428 58.514285v292.571429c0 29.257143-29.257143 58.514286-58.514286 58.514286-29.257143-7.314286-58.514286-36.571429-58.514285-65.828572V526.628571L555.885714 658.285714c-7.314286 14.628571-29.257143 21.942857-43.885714 21.942857s-36.571429-7.314286-43.885714-21.942857L351.085714 526.628571V658.285714c0 29.257143-29.257143 58.514286-58.514285 58.514286s-58.514286-29.257143-58.514286-58.514286V365.714286c0-21.942857 14.628571-43.885714 36.571428-58.514286z"
                            p-id="12587"
                            fill="#1296db"
                        ></path>
                    </svg>
                </div>
                <div className="text-white">未命名的作品</div>
            </div>

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
