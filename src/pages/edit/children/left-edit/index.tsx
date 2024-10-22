import React, { FC } from 'react'
import { Tabs } from 'antd'
import { TabItem } from './config'

const LeftEditor: FC = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" items={TabItem} size="large" centered />
        </div>
    )
}

export default LeftEditor
