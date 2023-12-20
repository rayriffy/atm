import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const pinAtom = atom('')
export const usePinAtom = () => useStore(pinAtom)
