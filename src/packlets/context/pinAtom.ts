import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

export const pinAtom = atom('')
export const usePinAtom = () => useStore(pinAtom)
