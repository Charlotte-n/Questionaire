import { Collapse } from 'antd'
import React, { FC } from 'react'
import PropsTable from '../props-table'
import { useAppSelector } from '../../../../stores'
import { getCurrentElement } from '../../../../stores/editor'
import { defaultEditGroups } from './config'

interface IProps {
    handleChange: (value: any) => void
}

const EditGroup: FC<IProps> = ({ handleChange }) => {
    const currentElement = useAppSelector(getCurrentElement)
    return (
        <div>
            <Collapse style={{ borderRadius: 0 }}>
                {defaultEditGroups.map((item, index) => {
                    return (
                        <Collapse.Panel key={item.text} header={item.text}>
                            <PropsTable
                                {...currentElement}
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
