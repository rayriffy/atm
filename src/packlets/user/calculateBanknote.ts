import { ErrorCode, Note } from '$bank/constants'

export const calculateBanknote = (
  request: number,
  balance: number,
  inventory: Record<Note, number>
) => {
  // check if user overdrawn than limit
  if (balance - request < -100) throw ErrorCode.InsufficientFunds
  // check if bank has enough banknotes
  else if (
    Object.entries(inventory).reduce(
      (acc, [note, count]) => acc + Number(note) * count,
      0
    ) < request
  )
    throw ErrorCode.InsufficientBanknotes

  // list all banknote denominations
  const denominations = Object.keys(inventory) as Array<Note>

  // sort dominations by bank inventory (higher dispensed first)
  denominations.sort((a, b) => inventory[b] - inventory[a])

  // iterate trough dominations
  const result: Partial<Record<Note, number>> = {}
  for (const denomination of denominations) {
    // calculate the number of banknotes needed for the current denomination
    const count = Math.floor(request / Number(denomination))

    // update the result object with the count
    result[denomination] = Math.min(count, inventory[denomination])

    // deduct the remaining amount
    request -= (result[denomination] ?? 0) * Number(denomination)
  }

  // if the request is not 0, then the bank does not have the right combination
  if (request !== 0) throw ErrorCode.CombinationNotFound

  return result as Record<Note, number>
}
