import React, { FC, MouseEvent } from 'react'
interface Props {
    setActive: (event: MouseEvent, id: string) => void
    id: string
    children: any
    onChange?: (id: string) => void
}
const EditWrapper: FC<Props> = (props) => {
    const { setActive, id, children } = props
    return (
        <div onClick={(event: MouseEvent) => setActive(event, id)}>
            {children.content}
        </div>
    )
}

export default EditWrapper
