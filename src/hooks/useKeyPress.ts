import { useEffect } from 'react'

export const useKeyPress = (key: string, callback: () => void) => {
    const trigger = (event: KeyboardEvent) => {
        if (event.key === key) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', trigger)
        return () => {
            document.removeEventListener('keydown', trigger)
        }
    }, [trigger])
}
