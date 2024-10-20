import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseType } from '../apis/interface'

interface AsyncThunkConfig {
    rejectValue: any
}
/**‘
 * 
 * Returned: 异步操作返回的数据类型
  ThunkArg: 传入异步操作的参数类型，默认为 void
 * 
 * @param typePrefix 用于 Redux action 的类型前缀
 * @param apiCall  实际执行 API 调用的函数
 * @returns 
 */
export function createAsyncThunkWrapper<Returned, ThunkArg = void>(
    typePrefix: string,
    apiCall: (arg: ThunkArg) => Promise<ResponseType<Returned>>,
    returnedAll: boolean,
) {
    return createAsyncThunk<
        ResponseType<Returned> | Returned,
        ThunkArg,
        AsyncThunkConfig
    >(typePrefix, async (arg: ThunkArg, { rejectWithValue }) => {
        try {
            const res = await apiCall(arg)
            return returnedAll ? res : res.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err)
        }
    })
}
