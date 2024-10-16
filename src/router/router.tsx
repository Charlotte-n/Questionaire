import { RouterType } from './index'
import React from 'react'
import Editor from '../pages/edit/index.tsx'
import { lazy } from 'react'

const Login = lazy(() => import('../pages/login/index.tsx'))
const Home = lazy(() => import('../pages/home/index.tsx'))
const router: RouterType = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        //动态路由
        path: '/edit/:id',
        element: <Editor></Editor>,
    },
]

export default router
