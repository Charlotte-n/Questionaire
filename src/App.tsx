import route from './router/index.tsx'
import 'cropperjs/dist/cropper.min.css'
import withProductRoute from './hoc/withProductRoute.tsx'
import { useRoutes } from 'react-router-dom'
import router from './router/router.tsx'
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
    return <div className="App">{elementRouter}</div>
}

export default withProductRoute(App, protectedRoutes)
