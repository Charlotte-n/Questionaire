import Editor from '../pages/edit/index.tsx'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../RootPage.tsx'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('../pages/login/index.tsx'))
const Home = lazy(() => import('../pages/home/home.tsx'))
const MyWorks = lazy(() => import('../pages/my-works/index.tsx'))
const Template = lazy(() => import('../pages/template/index.tsx'))
const Profile = lazy(() => import('../pages/profile/index.tsx'))
const Recomend = lazy(() => import('../pages/home/children/recomend/index.tsx'))
const CreateDesign = lazy(() => import('../pages/home/children/create-design/index.tsx'))
const MyWorkBatch = lazy(() => import('../pages/myWorkBatch/index.tsx'))
const HaiBao = lazy(() => import('../pages/myWorkBatch/pages/haibao/index.tsx'))
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to="/gxt/home/recommend" replace />,
        },
        {
            path: '/gxt',
            element: <RootPage></RootPage>,
            children: [
                {
                    path: 'home',
                    element: <Home />,
                    //重定向
                    children: [
                        {
                            index: true,
                            element: <Navigate to="/gxt/home/recommend" replace />,
                        },
                        {
                            path: 'recommend',
                            element: <Recomend />,
                        },
                        {
                            path: 'create-design',
                            element: <CreateDesign />,
                        },
                    ],
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
                    path: 'myWorkBatch',
                    element: <MyWorkBatch />,
                    children: [
                        {
                            path: '',
                            element: <Navigate to="/gxt/myWorkBatch/haibao" replace />,
                        },
                        {
                            path: 'haibao',
                            element: <HaiBao />
                        }
                    ]

                },
                {
                    path: 'template/:id',
                    element: <Template />,
                },
                {
                    path: 'profile',
                    element: <Profile />,
                },
            ],
        },
    ],
    { basename: '/' },
)
export default router
