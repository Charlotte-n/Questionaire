import { Divider, Modal, Tabs } from 'antd'
import React, { FC } from 'react'
import { MergeProps } from '../../../../stores/commonproperties'
import { useAppSelector } from '../../../../stores'
import { TabItems } from './config'

interface PublishModalProps {
    isModalOpen: boolean
    onClose: () => void
}
const defaultProp: PublishModalProps = {
    isModalOpen: true,
    onClose: () => {},
}
const PublishModal: FC<PublishModalProps> = (props) => {
    const defaultProps = MergeProps(defaultProp, props)
    const { isModalOpen, onClose } = defaultProps as any

    const { page } = useAppSelector((state) => state.editorSlice)
    return (
        <Modal
            title="发布成功"
            open={isModalOpen}
            footer={false}
            onCancel={() => onClose()}
        >
            <Divider></Divider>
            <div className="w-[100%] flex items-stretch">
                <div className="w-[30%] mr-[30px]">
                    <div>封面图</div>
                    <div className="">
                        <img src={page.coverImg} alt="封面图" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex h-[50px]">
                        <div className="">
                            <p>{page.title}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Tabs type="card" items={TabItems}></Tabs>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PublishModal
