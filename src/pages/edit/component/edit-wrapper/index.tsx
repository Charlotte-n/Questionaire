import React, { FC } from 'react'
interface Props {
    setActive: (event: MouseEvent, id: string) => void
    id: string
    children: any
    active: boolean
    onChange?: (id: string) => void
}
const EditWrapper: FC<Props> = (props) => {
    const { setActive, id, children, active } = props

    return (
        <div
            onClick={(event) => setActive(event, id)}
            className={
                active ? 'border-[1px] border-[#1890ff] border-solid' : ''
            }
        >
            {children.content}
        </div>
    )
}

export default EditWrapper
