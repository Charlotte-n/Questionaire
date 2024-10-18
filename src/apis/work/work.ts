import hyRequest from '../../services'
import { getLocalStorage } from '../../utils/localstorge'
import { ResponseType } from '../interface'

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

//复制模板
export const copyWork = (id: string) => {
    return hyRequest.post({
        url: `/works/copyWork`,
        opName: 'copyTemplate',
        data: {
            id,
            author: getLocalStorage('userInfo')?.username || '',
        },
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
    return hyRequest.post<ResponseType<any>>({
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

//获取我的单个作品
export const getMySingleWork = (id: string) => {
    return hyRequest.get({
        url: `/works/myWork/${id}`,
        opName: 'getMySingleWork',
    })
}

//创建渠道
export const createChannel = ({
    workId,
    name,
}: {
    workId: string
    name: string
}) => {
    return hyRequest.post<ResponseType<any>>({
        url: '/channels/createChannel',
        opName: 'createChannel',
        data: {
            workId,
            name,
        },
    })
}

//获取渠道列表
export const getChannelList = (id: string) => {
    return hyRequest.get({
        url: `/channels/getChannelList/${id}`,
        opName: 'getChannelList',
    })
}

//更新渠道名字
export const updateChannelName = ({
    id,
    data,
}: {
    id: string
    data: { name: string }
}) => {
    return hyRequest.post({
        url: `/channels/updateChannelName/${id}`,
        opName: 'updateChannelName',
        data,
    })
}

//删除渠道
export const deleteChannel = (id: string) => {
    return hyRequest.delete({
        url: `/channels/deleteChannel/${id}`,
        opName: 'deleteChannel',
    })
}
