import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from '../pages/counter/store'
import EditorReducer from './editor'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import templateReducer from './templates'
import userReducer from './user'
import globalReducer from './global'

const store = configureStore({
    reducer: {
        counterSlice: CounterReducer,
        editorSlice: EditorReducer,
        userSlice: userReducer,
        globalSlice: globalReducer,
        templateSlice: templateReducer,
    },
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
