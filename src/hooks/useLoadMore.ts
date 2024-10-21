import { useMemo, useRef } from 'react'

interface IParams {
    pageIndex: number
    pageSize: number
}

export const useLoadMore = (
    api: (params: IParams) => void,
    total: number,
    params: IParams,
) => {
    const pageIndex = useRef((params && params.pageIndex) || 0)
    const requestParam = useMemo(() => {
        return {
            ...params,
            pageIndex: pageIndex.current,
        }
    }, [params])

    //加载更多
    const loadMore = () => {
        pageIndex.current++
        api(requestParam)
    }

    //是否为最后一页
    const isLastPage = useMemo(() => {
        return Math.ceil(total / params.pageSize) === pageIndex.current + 1
    }, [total, params.pageSize, pageIndex.current])

    return {
        loadMore,
        pageIndex,
        isLastPage,
    }
}
