import { FC } from 'react'
import Header from './pages/layout/header/index.tsx'
import { Layout, Button } from 'antd'
import Footer from './pages/layout/footer/index.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import withProductRoute from './hoc/withProductRoute.tsx'
import ErrorBoundary from './components/ErrorBoundry/index.tsx'
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
    const noFooterRoutes = ['/login', '/edit/:id']

    // 检查当前路径是否在 noHeaderRoutes 中定义
    const showHeader = !noHeaderRoutes.some((path) => {
        // 如果路径中包含参数（如：:id），你可能需要更复杂的匹配逻辑
        // 这里只是一个简单的示例，仅适用于静态路径
        return (
            location.pathname === path ||
            location.pathname.match(path.replace(':id', '\\d+'))
        )
    })

    const showFooter = !noHeaderRoutes.some((path) => {
        // 如果路径中包含参数（如：:id），你可能需要更复杂的匹配逻辑
        // 这里只是一个简单的示例，仅适用于静态路径
        return (
            location.pathname === path ||
            location.pathname.match(path.replace(':id', '\\d+'))
        )
    })

    return (
        <ErrorBoundary fallback={<div>出错了</div>}>
            <div>
                {showHeader && (
                    <Layout.Header className="root-header z-[100] bg-[white] sticky top-[0px] border-b">
                        <Header></Header>
                    </Layout.Header>
                )}
                <Layout.Content className="min-h-[75vh]">
                    <Outlet></Outlet>
                </Layout.Content>

                {/* {showFooter && (
                    <Layout.Footer className="bg-[#333333] w-[100%] px-0 py-[10px]">
                        <Footer></Footer>
                    </Layout.Footer>
                )} */}
            </div>
        </ErrorBoundary>
    )
}

export default withProductRoute(RootPage, ProductRoute)
