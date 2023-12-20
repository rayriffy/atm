import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const padLockAtom = atom(false)
export const usePadLockAtom = () => useStore(padLockAtom)
