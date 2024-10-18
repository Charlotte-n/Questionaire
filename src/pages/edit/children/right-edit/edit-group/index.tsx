import { Collapse } from 'antd'
import React, { FC } from 'react'
import PropsTable from '../props-table'

import { defaultEditGroups } from './config'

interface IProps {
    handleChange: (item: {
        id: string
        key: string | string[]
        value: string | string[]
    }) => void
}

const EditGroup: FC<IProps> = ({ handleChange }) => {
    return (
        <div>
            <Collapse style={{ borderRadius: 0 }}>
                {defaultEditGroups.map((item) => {
                    return (
                        <Collapse.Panel key={item.text} header={item.text}>
                            <PropsTable
                                onChange={handleChange}
                                subName={item.subName}
                            ></PropsTable>
                        </Collapse.Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default EditGroup
