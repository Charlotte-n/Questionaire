import React, { FC, useEffect } from 'react'

import Hot from './children/hot'
import { useAppDispatch } from '../../stores'
import { getUserInfoAsync } from '../../stores/user'
import { getLocalStorage } from '../../utils/localstorge'

const Home: FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        // 获取用户信息
        dispatch(getUserInfoAsync(getLocalStorage('phone')))
    }, [])
    return (
        <div>
            <Hot />
        </div>
    )
}

export default Home
