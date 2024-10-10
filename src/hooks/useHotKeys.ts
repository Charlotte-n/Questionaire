import hotkeys, { KeyHandler } from 'hotkeys-js'
import { useEffect } from 'react'

export const useHotKeys = (key: string, callback: KeyHandler) => {
    useEffect(() => {
        hotkeys(key, callback)
        return () => {
            hotkeys.unbind(key, callback)
        }
    }, [key, callback])
}
