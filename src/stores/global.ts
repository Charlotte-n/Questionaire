import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    requestNum: number
    opName: {
        [key: string]: boolean
    }
    errors: {
        status: boolean
        message?: ''
    }
}

const initialState: initialStateType = {
    requestNum: 0,
    opName: {},
    errors: {
        status: false,
        message: '',
    },
}
export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        startLoading(state, props) {
            const { opName } = props.payload
            state.requestNum++
            if (opName) {
                state.opName[opName] = true
            }
        },
        finishLoading(state, props) {
            const { opName } = props.payload
            state.requestNum--
            if (opName) {
                delete state.opName[opName]
            }
        },
        setError(state, props) {
            state.errors = props.payload
        },
    },
})

export const isLoading = (state: any) => {
    return state.globalSlice.requestNum > 0
}

export const opNameIsLoading = (state: any, opName: any): boolean => {
    console.log(state.getState().globalSlice.opName[opName], opName)
    return state.getState().globalSlice.opName[opName]
}
export const { finishLoading, startLoading, setError } = globalSlice.actions

export default globalSlice.reducer
