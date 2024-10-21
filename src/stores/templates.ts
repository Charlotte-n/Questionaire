import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTemplateList } from '../apis/work/work'

interface initialStateType {
    templates: Array<any>
    total: number
}

const initialState: initialStateType = {
    templates: [],
    total: 0,
}
export const templatesSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        fetchTemplates(state, props) {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTemplatesAsync.fulfilled, (state, props) => {
            if (props.meta.arg.pageIndex === 0) {
                state.templates = props.payload?.list ? props.payload.list : []
                state.total = props.payload?.count ? props.payload.count : 0
            } else {
                state.templates = [...state.templates, ...props.payload?.list]
            }
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
