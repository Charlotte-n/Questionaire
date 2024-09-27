import React, { FC, useEffect } from 'react'
import {
    ComponentConfType,
    getComponentConfByType,
} from '../../../../components'
import {
    LTextPropsType,
    OptionalLTextPropsType,
} from '../../../../components/LText'
import { useAppSelector } from '../../../../stores'
import { getCurrentElement } from '../../../../stores/editor'
import NoPage from '../no-page'
import { propsComponentMap } from '../../../../utils/propsMap'

const PropsTable: FC<LTextPropsType> = (prop) => {
    const currentElement = useAppSelector(getCurrentElement)
    if (!currentElement) return <NoPage></NoPage>
    const { props, name, id } = currentElement
    if (!id) return <NoPage></NoPage>
    const { ChangePropComponent } = getComponentConfByType(
        name,
    ) as ComponentConfType
    const PropsComponent = propsComponentMap[ChangePropComponent]
    useEffect(() => {
        console.log(PropsComponent)
    })

    function handleOnChange(item: OptionalLTextPropsType & { id: string }) {
        prop.onChange && prop.onChange(item)
    }
    return (
        <PropsComponent
            {...props}
            onChange={handleOnChange}
            id={id}
        ></PropsComponent>
    )
}

export default PropsTable
