import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

export const balanceAtom = atom(0)
export const useBalanceAtom = () => useStore(balanceAtom)
