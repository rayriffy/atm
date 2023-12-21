import { describe, it, vi, expect } from 'vitest'

import { withdraw } from './withdraw'

const bankInventoryAtomSpy = vi.hoisted(() => ({
  get: vi.fn().mockReturnValue({
    10: 30,
  }),
  setKey: vi.fn(),
}))
vi.mock('$context/bankInventoryAtom', () => ({
  bankInventoryAtom: bankInventoryAtomSpy,
}))

const userInventoryAtomSpy = vi.hoisted(() => ({
  get: vi.fn().mockReturnValue({
    10: 0,
  }),
  setKey: vi.fn(),
}))
vi.mock('$context/userInventoryAtom', () => ({
  userInventoryAtom: userInventoryAtomSpy,
}))

const balanceAtomSpy = vi.hoisted(() => ({
  get: vi.fn().mockReturnValue(0),
  set: vi.fn(),
}))
vi.mock('$context/balanceAtom', () => ({
  balanceAtom: balanceAtomSpy,
}))

const calculateBanknoteSpy = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    '10': 2,
  })
)
vi.mock('./calculateBanknote', () => ({
  calculateBanknote: calculateBanknoteSpy,
}))

describe('withdraw()', () => {
  it('should update state and atom on withdraw', async () => {
    await withdraw(20)

    expect(balanceAtomSpy.get).toBeCalledTimes(1)
    expect(bankInventoryAtomSpy.get).toBeCalledTimes(1)
    expect(userInventoryAtomSpy.get).toBeCalledTimes(1)

    expect(calculateBanknoteSpy).toBeCalledTimes(1)
    expect(calculateBanknoteSpy).toReturnWith({ '10': 2 })

    expect(bankInventoryAtomSpy.setKey).toBeCalledTimes(1)
    expect(userInventoryAtomSpy.setKey).toBeCalledTimes(1)
    expect(balanceAtomSpy.set).toBeCalledTimes(1)
  })
})
