import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../apis/user/login'

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
    userInfo: null,
    token: localStorage.getItem('token') || '',
    isLogin: JSON.parse(localStorage.getItem('isLogin') as string) || false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, props) {
            localStorage.setItem('token', props.payload)
            state.token = props.payload
        },
        setIsLogin(state, props) {
            localStorage.setItem('isLogin', props.payload)
            state.isLogin = props.payload
        },
        loginout(state) {
            state.userInfo = null
            state.token = ''
            localStorage.removeItem('token')
            localStorage.removeItem('phone')
            localStorage.removeItem('isLogin')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoAsync.fulfilled, (state, props: any) => {
            if (props.meta.arg) {
                localStorage.setItem('phone', props.meta.arg)
            }
            state.isLogin = true
            state.userInfo = props.payload
        })
    },
})

export const getUserInfoAsync = createAsyncThunk(
    'user/setUserInfo',
    async (phone: string, { rejectWithValue }) => {
        try {
            const res = await getUserInfo(
                phone ? phone : (localStorage.getItem('phone') as string),
            )
            return res.data
        } catch (err) {
            return rejectWithValue(err)
        }
    },
)
export const { setToken, setIsLogin, loginout } = userSlice.actions
export default userSlice.reducer
