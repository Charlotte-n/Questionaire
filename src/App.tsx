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

    return (
        <div className="App">
            {location.pathname !== '/login' ? (
                <Layout.Header>
                    <Header></Header>
                </Layout.Header>
            ) : null}

            <Layout.Content>{elementRouter}</Layout.Content>
            <Layout.Footer>
                <Footer></Footer>
            </Layout.Footer>
        </div>
    )
}

export default withProductRoute(App, protectedRoutes)
