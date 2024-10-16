import { Button, Dropdown, MenuProps, message } from 'antd'
import React, { FC } from 'react'
import { menuList } from './config'
import { useDispatch } from 'react-redux'
import { loginout } from '../../../stores/user'
import { useNavigate } from 'react-router-dom'

const Header: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
            <h2 className="text-white">Merikle低代码海报制作</h2>
            <div className="flex justify-center items-center">
                <Button type="primary" className="rounded-full mr-[25px]">
                    创建设计
                </Button>
                <Button type="primary" className="rounded-full mr-[25px]">
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
