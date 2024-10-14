import { createSlice } from '@reduxjs/toolkit'

interface UserStateType {
    username: string
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

export const { setToken } = userSlice.actions
export default userSlice.reducer
