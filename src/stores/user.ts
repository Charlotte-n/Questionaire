import { createSlice } from '@reduxjs/toolkit'

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
}

const initialState: initialStateType = {
    userInfo: null,
    token: '',
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, props) {
            state.userInfo = props.payload
        },
        setToken(state, props) {
            state.token = props.payload
        },
    },
})

export const { setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer
