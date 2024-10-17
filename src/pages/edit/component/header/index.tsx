import React, { FC } from 'react'
import { Button, Dropdown, MenuProps, message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../stores'
import { saveTemplateAsync } from '../../../../stores/editor'
import { menuList } from '../../../layout/header/config'
import { loginout } from '../../../../stores/user'

const EditHeader: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const buttonClassName = 'rounded-full mr-[25px]'

    const saveWork = () => {
        dispatch(saveTemplateAsync(id as string))
    }

    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e)
        if (e.key === '2') {
            dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }

    return (
        <div className="flex justify-between">
            <div className="text-white">未命名的作品</div>

            <div className="flex justify-center items-center">
                <Button type="primary" className={buttonClassName}>
                    预览和设置
                </Button>

                <Button
                    type="primary"
                    className={buttonClassName}
                    onClick={() => saveWork()}
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
