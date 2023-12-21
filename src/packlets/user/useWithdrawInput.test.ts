import { renderHook, act } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'

import { useWithdrawInput } from './useWithdrawInput'

import { ErrorCode } from '$bank/constants'
import { withdrawAtom } from '$context/withdrawAtom'

const useWithdrawAtomSpy = vi.hoisted(() => vi.fn().mockReturnValue(''))
const setWithdrawAtomSpy = vi.hoisted(() => vi.fn())
vi.mock('$context/withdrawAtom', () => ({
  useWithdrawAtom: useWithdrawAtomSpy,
  withdrawAtom: {
    set: setWithdrawAtomSpy,
  },
}))

const callWithdrawSpy = vi.hoisted(() =>
  vi
    .fn()
    .mockReturnValue(Promise.resolve())
    .mockRejectedValue('InsufficientFunds')
)
vi.mock('./withdraw', () => ({
  withdraw: callWithdrawSpy,
}))

describe('useWithdrawInput()', () => {
  it('should initialize', () => {
    const { result } = renderHook(() => useWithdrawInput())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()

    expect(result.current.value).toBe(0)
  })

  it('should update state on withdraw', async () => {
    const { result } = renderHook(() => useWithdrawInput())

    expect(result.current.loading).toBe(false)

    await act(async () => {
      await result.current.withdraw()
    })

    expect(withdrawAtom.set).toBeCalledTimes(1)
    expect(result.current.loading).toBe(false)

    await act(async () => {
      await result.current.withdraw()
    })

    expect(result.current.error).toBe(ErrorCode.InsufficientFunds)
  })
})
