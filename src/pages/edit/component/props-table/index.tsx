import React, { FC } from 'react'
import {
    ComponentConfType,
    getComponentConfByType,
} from '../../../../components'
import { LTextPropsType } from '../../../../components/LText'
import { useAppSelector } from '../../../../stores'
import { getCurrentElement } from '../../../../stores/editor'
import NoPage from '../no-page'

const PropsTable: FC<LTextPropsType> = (prop) => {
    const currentElement = useAppSelector(getCurrentElement)
    if (!currentElement) return <NoPage></NoPage>
    const { props, name, id } = currentElement
    if (!id) return <NoPage></NoPage>
    const { ChangePropComponent } = getComponentConfByType(
        name,
    ) as ComponentConfType
    return <ChangePropComponent {...props}></ChangePropComponent>
}

export default PropsTable
