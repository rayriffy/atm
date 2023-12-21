import { describe, expect, it } from 'vitest'

import { calculateBanknote } from './calculateBanknote'

import { ErrorCode, Note } from '$bank/constants'

describe('calculateBanknote()', () => {
  const inventory = {
    [Note.Five]: 2,
    [Note.Ten]: 5,
    [Note.Twenty]: 10,
  }

  it('should return the correct result', () => {
    const request = 100
    const balance = 500

    const result = calculateBanknote(request, balance, inventory)

    expect(result).toEqual({
      [Note.Five]: 0,
      [Note.Ten]: 0,
      [Note.Twenty]: 5,
    })
  })

  it('should throw an error if the user is overdrawn', () => {
    const request = 1
    const balance = -100

    expect(() => calculateBanknote(request, balance, inventory)).toThrowError(
      ErrorCode.InsufficientFunds
    )
  })

  it('should throw an error if the bank does not have enough banknotes', () => {
    const request = 1000
    const balance = 9999

    expect(() =>
      calculateBanknote(request, balance, {
        [Note.Five]: 0,
        [Note.Ten]: 0,
        [Note.Twenty]: 0,
      })
    ).toThrowError(ErrorCode.InsufficientBanknotes)
  })

  it('should throw an error if the bank does not have the right combination', () => {
    const request = 3
    const balance = 500

    expect(() =>
      calculateBanknote(request, balance, {
        [Note.Five]: 1,
        [Note.Ten]: 0,
        [Note.Twenty]: 1,
      })
    ).toThrowError(ErrorCode.CombinationNotFound)
  })
})
