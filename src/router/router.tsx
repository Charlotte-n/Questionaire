import { RouterType } from './index'
import React from 'react'
const router: RouterType = [
    {
        path: '/',
        element: <div>Hello world!</div>,
        children: null,
    },
    {
        path: '/login',
        element: <div>登陆页面</div>,
        children: null,
    },
]

export default router
