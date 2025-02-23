import hyRequest from '../../services'
import { getLocalStorage } from '../../utils/localstorge'
import { ResponseType } from '../interface'
import { TemplateType } from './interface'

//获取模板
export const getTemplateList = ({
    pageSize,
    pageIndex,
    title,
}: {
    pageSize: number
    pageIndex: number
    title?: string
}) => {
    return hyRequest.get({
        url: '/works/templateList',
        opName: 'getTemplateList',
        params: {
            pageSize,
            pageIndex,
            title: title,
        },
    })
}

//获取单个模板
export const getSingleTemplate = (id: string) => {
    return hyRequest.get<ResponseType<TemplateType>>({
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
export const saveWorks = ({ id, data }: { id: string; data: any }) => {
    return hyRequest.post({
        url: `/works/update/${id}`,
        opName: 'saveWorks',
        data,
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

//获取我的作品列表
export const getMyList = (data: {
    pageSize: number
    pageIndex: number
    title?: string
    isTemplate: number
}) => {
    return hyRequest.get<
        ResponseType<{
            count: number
            list: TemplateType[]
            pageIndex: number
            pageSize: number
        }>
    >({
        url: '/works/getMyList',
        opName: 'getMyList',
        params: data,
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

//更新作品名称
export const updateName = (data: {
    id: string
    title: string
    subTitle?: string
}) => {
    return hyRequest.post({
        url: `/works/update/${data.id}`,
        opName: 'updateName',
        data: {
            title: data.title,
            subTitle: data.subTitle,
        },
    })
}

//创建空作品
export const createEmptyWork = () => {
    return hyRequest.post<ResponseType<any>>({
        url: `/works/createEmptyWork`,
        opName: 'createEmptyWork',
    })
}

//删除我的模板
export const deleteMyWork = (id: string) => {
    return hyRequest.post<ResponseType<TemplateType>>({
        url: `/works/delete/${id}`,
        opName: 'deleteMyWork',
    })
}

//获取删除的作品
export const getDeleteWork = () => {
    return hyRequest.get<
        ResponseType<{
            count: number
            list: TemplateType[]
            pageIndex: number
            pageSize: number
        }>
    >({
        url: '/works/getDeletedWorks',
        opName: 'getDeleteWork',
    })
}

//恢复作品
export const recoverWork = (
    id: string,
    data: {
        isDeleted: boolean
    },
) => {
    return hyRequest.post({
        url: `/works/update/${id}`,
        opName: 'recoverWork',
        data,
    })
}
