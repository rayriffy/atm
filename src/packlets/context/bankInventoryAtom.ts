import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

import { Note } from '$bank/constants'

export const bankInventoryAtom = map<Record<Note, number>>({
  '5': 4,
  '10': 15,
  '20': 7,
})
export const useBankInventoryAtom = () => useStore(bankInventoryAtom)
