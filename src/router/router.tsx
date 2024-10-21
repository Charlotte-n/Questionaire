import React from 'react'
import Editor from '../pages/edit/index.tsx'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../RootPage.tsx'

const Login = lazy(() => import('../pages/login/index.tsx'))
const Home = lazy(() => import('../pages/home/index.tsx'))
const MyWorks = lazy(() => import('../pages/my-works/index.tsx'))
const router = createBrowserRouter(
    [
        {
            path: '/gxt/*',
            element: <RootPage></RootPage>,
            children: [
                {
                    path: 'home',
                    element: <Home />,
                },
                {
                    path: 'login',
                    element: <Login />,
                },
                {
                    //动态路由
                    path: 'edit/:id',
                    element: (
                        // <RequireSaveConfirmation>
                        <Editor></Editor>
                        // </RequireSaveConfirmation>
                    ),
                },
                {
                    path: 'myWorks',
                    element: <MyWorks />,
                },
            ],
        },
    ],
    { basename: '/' },
)
export default router
