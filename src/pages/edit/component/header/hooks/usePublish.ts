import { takeScreenshotAndUpload } from '../../../../utils/util'
import { ChangePagePropsAction } from '../../../../../stores/editor'
import { useAppDispatch, useAppSelector } from '../../../../../stores'
import { publishMyWork, createChannel } from '../../../../../apis/work/work'
import { getChannelListAsync } from '../../../../../stores/editor'
import { useParams } from 'react-router-dom'
import { useSaveWork } from './useSaveWork'

export const usePublish = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const { channels } = useAppSelector((state) => state.editorSlice)

    const { saveWorkApi } = useSaveWork(true)

    const publish = async () => {
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
            //获取渠道列表
            await dispatch(getChannelListAsync(id as string))
            //如果没有渠道列表就生成默认的渠道
            if (channels.length === 0) {
                createChannel({ workId: id as string, name: '' })
            }
        }
    }

    return {
        publish,
    }
}
