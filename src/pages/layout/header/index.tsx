import { Button, Dropdown, MenuProps, message } from 'antd'
import React, { FC } from 'react'
import { menuList } from './config'
import { loginout } from '../../../stores/user'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { saveTemplateAsync } from '../../../stores/editor'
import { useAppDispatch } from '../../../stores'

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const buttonClassName = 'rounded-full mr-[25px]'

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
            {/* 这个location.pathname匹配/edit/1,/edit/2 */}
            <h2 className="text-white">Merikle低代码海报制作</h2>

            <div className="flex justify-center items-center">
                <Button type="primary" className={buttonClassName}>
                    创建设计
                </Button>

                <Button type="primary" className={buttonClassName}>
                    我的作品
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

export default Header
