import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import router from '../router/router'
import store from '../stores'
import { getUserInfoAsync, setIsLogin } from '../stores/user'
import { message } from 'antd'

//改进一下，特定的路由来进行拦截
export default function withProductRoute(
    WrapperComponent: any,
    route: { path: string; isLogin: boolean; redirectLogin: boolean }[],
) {
    return function ProtectedRoute(props: any) {
        const navigate = useNavigate()
        const location = useLocation()

        useEffect(() => {
            const token = localStorage.getItem('token')
            if (store.getState().userSlice.isLogin) {
                //判断是否跳转到登陆页面
                if (
                    route.find((item) => item.path === location.pathname)
                        ?.redirectLogin
                ) {
                    navigate('/gxt/login', { replace: true })
                } else {
                    navigate(location.pathname, { replace: true })
                }
            } else {
                if (token) {
                    //重新获取用户信息
                    store.dispatch(getUserInfoAsync(''))
                    if (
                        route.find((item) => item.path === location.pathname)
                            ?.redirectLogin
                    ) {
                        navigate('/gxt/login', { replace: true })
                    } else {
                        navigate(location.pathname, { replace: true })
                    }
                } else {
                    //判断这个路由是否需要进行登陆
                    if (
                        route.find((item) => item.path === location.pathname)
                            ?.isLogin
                    ) {
                        navigate('/gxt/login', { replace: true })
                    } else {
                        navigate(location.pathname, { replace: true })
                    }
                }
            }
        }, [location.pathname])

        return <WrapperComponent {...props}></WrapperComponent>
    }
}
