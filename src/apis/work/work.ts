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
        url: `/works/template/${id}`,
        opName: 'getSingleTemplate',
    })
}

//保存单个模板
export const saveWorks = (id: string) => {
    return hyRequest.post({
        url: `/works/update/${id}`,
        opName: 'saveWorks',
    })
}

//发布模板
export const publishTemplate = (id: string) => {
    return hyRequest.post({
        url: `/works/publishTemplate/${id}`,
        opName: 'publishTemplate',
    })
}

//发布我的作品
export const publishMyWork = (id: string) => {
    return hyRequest.post({
        url: `/works/publishWork/${id}`,
        opName: 'publishMyWork',
    })
}
