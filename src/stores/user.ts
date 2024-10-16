import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../apis/user/login'
import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from '../utils/localstorge'

export interface UserStateType {
    _id: string
    username: string
    nickname: string
    updatedAt: string
    createdAt: string
    id: number
}

interface initialStateType {
    userInfo: UserStateType | null
    token: string
    isLogin: boolean
}

const initialState: initialStateType = {
    userInfo: getLocalStorage('userInfo') || null,
    token: localStorage.getItem('token') || '',
    isLogin: JSON.parse(localStorage.getItem('isLogin') as string) || false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, props) {
            localStorage.setItem('token', props.payload)
        },
        setIsLogin(state, props) {
            localStorage.setItem('isLogin', props.payload)
        },
        loginout(state) {
            removeLocalStorage('token')
            removeLocalStorage('userInfo')
            removeLocalStorage('phone')
            removeLocalStorage('isLogin')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoAsync.fulfilled, (state, props: any) => {
            if (props.meta.arg) {
                setLocalStorage('phone', props.meta.arg)
            }
            setLocalStorage('userInfo', props.payload)
        })
    },
})

export const getUserInfoAsync = createAsyncThunk(
    'user/setUserInfo',
    async (phone: string, { rejectWithValue }) => {
        try {
            setLocalStorage('isLogin', true)
            const res = await getUserInfo(
                phone ? phone : (getLocalStorage('phone') as string),
            )

            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)
export const { setToken, setIsLogin, loginout } = userSlice.actions
export default userSlice.reducer
