import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTemplateList } from '../apis/work/work'

interface initialStateType {
    templates: Array<any>
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
        builder.addCase(fetchTemplatesAsync.fulfilled, (state, props) => {
            state.templates = props.payload?.list ? props.payload.list : []
        })
    },
})

export const fetchTemplatesAsync = createAsyncThunk(
    'template/fetchTemplate',
    async (
        {
            pageSize,
            pageIndex,
        }: {
            pageSize: number
            pageIndex: number
        },
        { rejectWithValue },
    ) => {
        try {
            const res = await getTemplateList({ pageSize, pageIndex })
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

export const { fetchTemplates } = templatesSlice.actions

export default templatesSlice.reducer
