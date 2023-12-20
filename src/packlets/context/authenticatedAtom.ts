import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const authenticatedAtom = atom(false)
export const useAuthenticatedAtom = () => useStore(authenticatedAtom)
