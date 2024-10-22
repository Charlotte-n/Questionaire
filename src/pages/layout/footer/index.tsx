import React, { FC } from 'react'
import './index.css'

const Footer: FC = () => {
    const firstClass = 'font-bold text-white text-[18px]'
    return (
        <div className="flex flex-col items-center">
            <div className="w-[88vw] flex justify-between border-b-[1px] border-solid border-[#cccccc] px-[100px]  py-[10px]">
                <ul>
                    <li className={firstClass}>海报易创</li>
                    <li>学习</li>
                    <li>作业</li>
                    <li>
                        <a href="https://baidu.com">开源仓库</a>
                    </li>
                    <li>帮助</li>
                </ul>
                <ul>
                    <li className={firstClass}>设计制作帮助</li>
                    <li>反馈</li>
                </ul>
                <ul>
                    <li className={firstClass}>审核问题</li>
                    <li>反馈相关问题</li>
                </ul>
                <ul>
                    <li className={firstClass}>联系我们</li>
                    <li>联系我们</li>
                </ul>
            </div>
            <div className="text-[#cccccc] flex justify-center py-[15px] text-[18px]">
                © 2024 海报易创版权所有
            </div>
        </div>
    )
}

export default Footer
