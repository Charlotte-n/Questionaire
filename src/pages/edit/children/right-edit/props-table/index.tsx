import { FC, useEffect } from 'react'
import {
    ComponentConfType,
    getComponentConfByType,
} from '../../../../../components'
import { useAppSelector } from '../../../../../stores'
import { getCurrentElement } from '../../../../../stores/editor'
import NoPage from '../../../component/no-page'
import { propsComponentMap } from '../../../../../utils/propsMap'

const PropsTable: FC<{
    subName: string
    onChange: (item: {
        id: string
        key: string | string[]
        value: string | string[]
    }) => void
}> = (prop) => {
    const currentElement = useAppSelector(getCurrentElement)
    if (!currentElement) return <NoPage></NoPage>

    const { name } = currentElement
    const { ChangePropComponent } = getComponentConfByType(
        name,
    ) as ComponentConfType
    const PropsComponent = propsComponentMap[ChangePropComponent]

    useEffect(() => {
        console.log(name, currentElement, '当前元素', ChangePropComponent)
    })

    function handleOnChange(item: {
        id: string
        key: string | string[]
        value: string | string[]
    }) {
        prop.onChange && prop.onChange(item)
    }

    return (
        <div>
            <PropsComponent
                onChange={handleOnChange}
                subName={prop.subName}
            ></PropsComponent>
        </div>
    )
}

export default PropsTable
