import hyRequest from '../../services'

//获取模板
export const getTemplateList = ({
    pageSize,
    pageIndex,
}: {
    pageSize: number
    pageIndex: number
}) => {
    return hyRequest.get({
        url: '/works/templateList',
        opName: 'getTemplateList',
        params: {
            pageSize,
            pageIndex,
        },
    })
}

//获取单个模板
export const getSingleTemplate = (id: string) => {
    return hyRequest.get({
        url: '/api/works/template/:id',
        params: {
            id,
        },
    })
}
