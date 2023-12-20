import { useStore } from '@nanostores/react'
import { map } from 'nanostores'

import { Note } from '$bank/constants'

export const userInventoryAtom = map<Record<Note, number>>({
  '5': 0,
  '10': 0,
  '20': 0,
})
export const useUserInventoryAtom = () => useStore(userInventoryAtom)
