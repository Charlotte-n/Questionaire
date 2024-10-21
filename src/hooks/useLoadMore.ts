import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch } from '../stores'

interface IParams {
    pageIndex: number
    pageSize: number
}

export const useLoadMore = (
    api: (params: any) => void,
    total: number,
    params: IParams,
) => {
    const dispatch = useAppDispatch()
    const [pageIndex, setPageIndex] = useState(
        (params && params.pageIndex) || 0,
    )

    const requestParam = useMemo(() => {
        return {
            ...params,
            pageIndex: pageIndex,
        }
    }, [params, pageIndex])

    //加载更多
    const loadMore = () => {
        setPageIndex(pageIndex + 1)
    }
    useEffect(() => {
        if (pageIndex >= 1) {
            dispatch(api(requestParam) as any)
        }
    }, [pageIndex])

    //是否为最后一页
    const isLastPage = useMemo(() => {
        return Math.ceil(total / params.pageSize) === pageIndex
    }, [total, params.pageSize, pageIndex])

    return {
        loadMore,
        pageIndex,
        isLastPage,
    }
}
