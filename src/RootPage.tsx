import React, { FC } from 'react'
import Header from './pages/layout/header/index.tsx'
import { Layout, message } from 'antd'
import Footer from './pages/layout/footer/index.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import withProductRoute from './hoc/withProductRoute.tsx'
import './index.css'

const ProductRoute = [
    {
        path: '/',
        isLogin: true,
        redirectLogin: false,
    },
    {
        path: '/home',
        isLogin: true,
        redirectLogin: false,
    },
]

const RootPage: FC = () => {
    const location = useLocation()
    //想要实现的效果是：/edit/:id, /login路由下不展示header
    const noHeaderRoutes = ['/edit/:id', '/login']

    // 检查当前路径是否在 noHeaderRoutes 中定义
    const showHeader = !noHeaderRoutes.some((path) => {
        // 如果路径中包含参数（如：:id），你可能需要更复杂的匹配逻辑
        // 这里只是一个简单的示例，仅适用于静态路径
        return (
            location.pathname === path ||
            location.pathname.match(path.replace(':id', '\\d+'))
        )
    })
    return (
        <div>
            {showHeader && (
                <Layout.Header className="root-header z-[10000] relative">
                    <Header></Header>
                </Layout.Header>
            )}

            <Layout.Content>
                <Outlet></Outlet>
            </Layout.Content>
            <Layout.Footer>
                <Footer></Footer>
            </Layout.Footer>
        </div>
    )
}

export default withProductRoute(RootPage, ProductRoute)
