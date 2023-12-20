import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const withdrawAtom = atom('')
export const useWithdrawAtom = () => useStore(withdrawAtom)
