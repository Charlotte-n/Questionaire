import Editor from '../pages/edit/index.tsx'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../RootPage.tsx'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('../pages/login/index.tsx'))
const Home = lazy(() => import('../pages/home/index.tsx'))
const MyWorks = lazy(() => import('../pages/my-works/index.tsx'))
const Template = lazy(() => import('../pages/template/index.tsx'))
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to="/gxt/home" replace />,
        },
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
                    element: <Editor></Editor>,
                },
                {
                    path: 'myWorks',
                    element: <MyWorks />,
                },
                {
                    path: 'template/:id',
                    element: <Template />,
                },
            ],
        },
    ],
    { basename: '/' },
)
export default router
