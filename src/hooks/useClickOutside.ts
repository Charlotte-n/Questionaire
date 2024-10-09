import { useEffect, useState } from 'react'

export const useClickOutside = (element: any) => {
    const [isClickOutSide, setIsClickOutSide] = useState(false)
    const handler = (e: any) => {
        console.log(e, element, '当前的值', element.contains(e.target))

        if (element && e.target) {
            if (!element.contains(e.target as HTMLElement)) {
                setIsClickOutSide(true)
            } else {
                setIsClickOutSide(false)
            }
        }
    }
    useEffect(() => {
        document.addEventListener('click', handler)
        return () => {
            document.removeEventListener('click', handler)
        }
    }, [element])
    return {
        isClickOutSide,
        setIsClickOutSide,
    }
}
