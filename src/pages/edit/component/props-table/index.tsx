import React, { FC } from 'react'
import {
    ComponentConfType,
    getComponentConfByType,
} from '../../../../components'
import { LTextPropsType } from '../../../../components/LText'
import { useAppSelector } from '../../../../stores'
import { getCurrentElement } from '../../../../stores/editor'

const PropsTable: FC<LTextPropsType> = (prop) => {
    const currentElement = useAppSelector(getCurrentElement)
    const { props, name } = currentElement
    const { ChangePropComponent } = getComponentConfByType(
        name,
    ) as ComponentConfType

    return <ChangePropComponent {...props}></ChangePropComponent>
}

export default PropsTable
