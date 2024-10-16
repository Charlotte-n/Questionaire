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
