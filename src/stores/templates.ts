import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    templates: []
}

const initialState: initialStateType = {
    templates: [],
}
export const templatesSlice = createSlice({
    name: '',
    initialState,
    reducers: {
        fetchTemplates(state, props) {},
    },
})

const fetchTemplates = createAsyncThunk('fetchTemplate', () => {})

export default templatesSlice.reducer
