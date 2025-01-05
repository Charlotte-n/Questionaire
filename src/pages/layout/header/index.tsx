import { Button, Dropdown, MenuProps, message } from 'antd'
import React, { FC } from 'react'
import { menuList } from './config'
import { loginout } from '../../../stores/user'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../stores'
import { createEmptyWork } from '../../../apis/work/work'

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const buttonClassName = 'rounded-full mr-[25px]'

    const onMenuClick = (e: any) => {
        if (e.key === '1') {
            navigate('/gxt/profile')
        } else if (e.key === '2') {
            dispatch(loginout())
            message.success('退出成功')
            setTimeout(() => {
                navigate('/gxt/login')
            }, 1000)
        }
    }

    // const handleCreateWork = async () => {
    //     const res = await createEmptyWork()
    //     if (res.code === 0) {
    //         navigate(`/gxt/edit/${res.data.id}`)
    //     }
    // }

    // 跳转到我的工作台
    const gotoMyWorks = () => {
        navigate('/gxt/myWorkBatch/haibao')
    }

    const gotoHome = () => {
        navigate('/gxt/home/recommend')
    }

    const gotoResource = () => {
        navigate('/gxt/home/create-design')
    }
    return (
        // <div className="flex justify-between">
        //     <h2
        //         className="text-white cursor-pointer flex items-center"
        //         onClick={() => navigate('/gxt/home')}
        //     >
        //         <svg
        //             viewBox="0 0 1024 1024"
        //             version="1.1"
        //             xmlns="http://www.w3.org/2000/svg"
        //             p-id="12586"
        //             width="50"
        //             height="50"
        //         >
        //             <path
        //                 d="M270.628571 307.2c21.942857-7.314286 51.2 0 65.828572 14.628571L512 533.942857l175.542857-204.8c14.628571-21.942857 43.885714-21.942857 65.828572-14.628571 21.942857 7.314286 36.571429 29.257143 36.571428 58.514285v292.571429c0 29.257143-29.257143 58.514286-58.514286 58.514286-29.257143-7.314286-58.514286-36.571429-58.514285-65.828572V526.628571L555.885714 658.285714c-7.314286 14.628571-29.257143 21.942857-43.885714 21.942857s-36.571429-7.314286-43.885714-21.942857L351.085714 526.628571V658.285714c0 29.257143-29.257143 58.514286-58.514285 58.514286s-58.514286-29.257143-58.514286-58.514286V365.714286c0-21.942857 14.628571-43.885714 36.571428-58.514286z"
        //                 p-id="12587"
        //                 fill="#1296db"
        //             ></path>
        //         </svg>
        //         海报易创
        //     </h2>

        //     <div className="flex justify-center items-center">
        //         <Button
        //             type="primary"
        //             className={buttonClassName}
        //             onClick={handleCreateWork}
        //         >
        //             创建设计
        //         </Button>

        //         <Button
        //             type="primary"
        //             className={buttonClassName}
        //             onClick={() => {
        //                 navigate('/gxt/myWorks')
        //             }}
        //         >
        //             我的作品
        //         </Button>

        //         <Dropdown.Button
        //             className="rounded-full"
        //             menu={{ items: menuList, onClick: onMenuClick }}
        //         >
        //             Merikle
        //         </Dropdown.Button>
        //     </div>
        // </div>
        <header className="flex justify-between ">
            <div className="flex items-center space-x-8">
                <div className="text-blue-600 font-bold text-xl cursor-pointer" onClick={gotoHome}>海报易创</div>
                <nav className="flex space-x-6">
                    <a href="#" className="text-gray-900" onClick={gotoHome}>首页</a>
                    <a href="#" className="text-gray-600" onClick={gotoResource}>资源社区</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <Button className="py-[18px] bg-blue-600 text-[white]" onClick={gotoMyWorks}>我的工作台</Button>
                <Dropdown.Button
                    className="rounded-full"
                    menu={{ items: menuList, onClick: onMenuClick }}
                >
                    Merikle
                </Dropdown.Button>
            </div>
        </header>
    )
}

export default Header
