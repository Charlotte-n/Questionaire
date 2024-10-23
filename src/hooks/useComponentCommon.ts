import { pick } from 'lodash-es'
import { useMemo } from 'react'

const useComponentCommon = <T extends { [key: string]: any }>(
    props: T,
    picks: string[],
) => {
    const styleProps = useMemo(() => {
        console.log(props, 'props')

        return pick(props.payload ? props.payload : props, picks)
    }, [props])

    const handleClick = () => {
        if (props.actionType === 'url' && props.url) {
            window.location.href = props.url
        }
    }
    return {
        styleProps,
        handleClick,
    }
}
export default useComponentCommon
