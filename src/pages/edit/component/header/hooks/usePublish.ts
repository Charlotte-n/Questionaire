import { takeScreenshotAndUpload } from '../../../../utils/util'
import {
    ChangePagePropsAction,
    clearSelected,
} from '../../../../../stores/editor'
import { useAppDispatch, useAppSelector } from '../../../../../stores'
import { publishMyWork, createChannel } from '../../../../../apis/work/work'
import { getChannelListAsync } from '../../../../../stores/editor'
import { useParams } from 'react-router-dom'
import { useSaveWork } from './useSaveWork'
import { useEffect } from 'react'

export const usePublish = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { channels } = useAppSelector((state) => state.editorSlice)
    const { saveWorkApi } = useSaveWork(true)

    const publish = async (handlePublishVisible?: () => void) => {
        const editWrapper = document.querySelector(
            '.edit-canvas',
        ) as HTMLElement
        const res = await takeScreenshotAndUpload(editWrapper)
        if (res) {
            //更新coverImg
            await dispatch(ChangePagePropsAction({ coverImg: res.url }))
            //保存
            await saveWorkApi()
            //发布
            await publishMyWork(id as string)
            //失去焦点
            dispatch(clearSelected())

            //如果没有渠道列表就生成默认的渠道
            if (channels && channels.length === 0) {
                createChannel({ workId: id as string, name: '' })
                dispatch(getChannelListAsync(id as string))
            }
            handlePublishVisible && handlePublishVisible()
        }
    }

    useEffect(() => {
        dispatch(getChannelListAsync(id as string))
    }, [])

    return {
        publish,
    }
}
