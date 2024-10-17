import React, { FC, useEffect } from 'react'
import { useNavigate, useLocation, useBlocker } from 'react-router-dom'
import { useAppSelector } from '../stores'
import { Modal } from 'antd'

const RequireSaveConfirmation: FC<{
    children: any
}> = ({ children }) => {
    const navigate = useNavigate() as any
    const location = useLocation()
    const { isDirty } = useAppSelector((state) => state.editorSlice)

    const block = useBlocker(isDirty)

    useEffect(() => {}, [])
    return <>{children}</>
}
export default RequireSaveConfirmation
