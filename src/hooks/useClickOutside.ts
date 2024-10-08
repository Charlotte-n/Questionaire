import { useEffect, useState } from 'react'

export const useClickOutside = (element: HTMLElement) => {
    const [isClickOutSide, setIsClickOutSide] = useState(false)
    const handler = (e: MouseEvent) => {
        if (element) {
            if (element.contains(e.target as HTMLElement)) {
                setIsClickOutSide(false)
            } else {
                setIsClickOutSide(true)
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
