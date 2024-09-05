import { RouterType } from './index'
import React from 'react'
import Editor from '../pages/edit/index.tsx'
const router: RouterType = [
    {
        path: '/',
        element: <div>Hello world!</div>,
    },
    {
        path: '/login',
        element: <div>登陆页面</div>,
    },
    {
        path: '/edit',
        element: <Editor></Editor>,
    },
]

export default router
