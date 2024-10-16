import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    templates: []
}

const initialState: initialStateType = {
    templates: [],
}
export const templatesSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        fetchTemplates(state, props) {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTemplatesAsync.fulfilled, (state, props) => {})
    },
})

const fetchTemplatesAsync = createAsyncThunk(
    'template/fetchTemplate',
    (id: string, { rejectWithValue }) => {
        console.log(id)
    },
)

export const { fetchTemplates } = templatesSlice.actions

export default templatesSlice.reducer
