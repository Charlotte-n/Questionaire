import React, { FC } from 'react'
interface Props {
    setActive: (id: string) => void
    id: string
    children: any
    active: boolean
}
const EditWrapper: FC<Props> = (props) => {
    const { setActive, id, children, active } = props
    return (
        <div
            onClick={() => setActive(id)}
            className={
                active ? 'border-[1px] border-[#1890ff] border-dashed' : ''
            }
        >
            {children.content}
        </div>
    )
}

export default EditWrapper
