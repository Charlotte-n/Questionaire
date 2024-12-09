import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyList, getTemplateList } from '../apis/work/work'
import { createAsyncThunkWrapper } from '../hoc/AsyncThunkWrapper'

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
                state.templates = [
                    ...state.templates,
                    ...(props.payload?.list ? props.payload.list : []),
                ]
            }
        })
        builder.addCase(
            fetchMyWorkOrTemplate.fulfilled,
            (state, props: any) => {
                state.templates = props.payload?.list ? props.payload.list : []
                state.total = props.payload?.count ? props.payload.count : 0
            },
        )
        // builder.addCase(searTemplateAsync.fulfilled, (state, props) => {})
    },
})

export const fetchTemplatesAsync = createAsyncThunk(
    'template/fetchTemplate',
    async (
        {
            pageSize,
            pageIndex,
            title,
        }: {
            pageSize: number
            pageIndex: number
            title: string
        },
        { rejectWithValue },
    ) => {
        try {
            const res = await getTemplateList({ pageSize, pageIndex, title })
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

export const fetchMyWorkOrTemplate = createAsyncThunkWrapper(
    'template/fetchMyWorkOrTemplate',
    getMyList,
    false,
)

export const { fetchTemplates } = templatesSlice.actions

export default templatesSlice.reducer
