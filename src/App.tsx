import 'cropperjs/dist/cropper.min.css'
import withProductRoute from './hoc/withProductRoute.tsx'
import { useRoutes } from 'react-router-dom'
import router from './router/router.tsx'
import Header from './pages/layout/header/index.tsx'
import { Layout, message } from 'antd'
import Footer from './pages/layout/footer/index.tsx'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppSelector } from './stores/index.ts'

const protectedRoutes = [
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

function App() {
    const elementRouter = useRoutes(router)
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
        <div className="App">
            {showHeader && (
                <Layout.Header>
                    <Header></Header>
                </Layout.Header>
            )}

            <Layout.Content>{elementRouter}</Layout.Content>
            <Layout.Footer>
                <Footer></Footer>
            </Layout.Footer>
        </div>
    )
}

export default withProductRoute(App, protectedRoutes)
