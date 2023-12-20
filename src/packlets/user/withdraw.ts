import { calculateBanknote } from './calculateBanknote'

import { Note } from '$bank/constants'
import { balanceAtom } from '$context/balanceAtom'
import { bankInventoryAtom } from '$context/bankInventoryAtom'
import { userInventoryAtom } from '$context/userInventoryAtom'

export const withdraw = async (requested: number) => {
  // get atom values
  const balance = balanceAtom.get()
  const bankInventory = bankInventoryAtom.get()
  const userInventory = userInventoryAtom.get()

  // calculate how much banknotes to dispense
  const resultEntires = Object.entries(
    calculateBanknote(requested, balance, bankInventory)
  ) as unknown as [Note, number][]

  // update user, and bank inventory
  resultEntires.forEach(([note, count]) => {
    bankInventoryAtom.setKey(note, bankInventory[note] - count)
    userInventoryAtom.setKey(note, userInventory[note] + count)
  })

  // update balance
  balanceAtom.set(balance - requested)
}
