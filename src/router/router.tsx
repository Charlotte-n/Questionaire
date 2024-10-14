import { RouterType } from './index'
import React from 'react'
import Editor from '../pages/edit/index.tsx'
import { lazy } from 'react'

const Login = lazy(() => import('../pages/login/index.tsx'))
const router: RouterType = [
    {
        path: '/',
        element: <div>Hello world!</div>,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/edit',
        element: <Editor></Editor>,
    },
]

export default router
