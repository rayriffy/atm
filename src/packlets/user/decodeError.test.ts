import { describe, expect, it } from 'vitest'

import { decodeError } from './decodeError'

import { ErrorCode } from '$bank/constants'

describe('decodeError()', () => {
  it('should return the correct error message for a given error code', () => {
    expect(decodeError(ErrorCode.InsufficientFunds)).toBe('Insufficient funds')
    expect(decodeError(ErrorCode.InsufficientBanknotes)).toBe(
      'Not enough banknotes to withdraw'
    )
    expect(decodeError(ErrorCode.CombinationNotFound)).toBe(
      'No possible combinations'
    )
  })
})
