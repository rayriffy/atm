import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

export const authenticatedAtom = atom(false)
export const useAuthenticatedAtom = () => useStore(authenticatedAtom)
