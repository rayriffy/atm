import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

export const balanceAtom = atom(0)
export const useBalanceAtom = () => useStore(balanceAtom)
