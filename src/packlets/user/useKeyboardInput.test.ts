import { renderHook, fireEvent, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { useKeyboardInput } from './useKeyboardInput'

import { ButtonValue } from '$pad/constants'

const withdrawSpy = vi.hoisted(() => vi.fn())
const { useWithdrawInputSpy, handlePadSpy } = vi.hoisted(() => ({
  useWithdrawInputSpy: vi.fn().mockReturnValue({
    value: 100,
    withdraw: withdrawSpy,
  }),
  handlePadSpy: vi.fn(),
}))

vi.mock('./handlePad', () => ({
  handlePad: handlePadSpy,
}))

vi.mock('./useWithdrawInput', () => ({
  useWithdrawInput: useWithdrawInputSpy,
}))

describe('useKeyboardInput()', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should trigger withdraw function when user hit enter', () => {
    renderHook(() => useKeyboardInput())

    act(() => {
      fireEvent.keyDown(window, { code: 'Enter' })
    })

    expect(handlePadSpy).not.toBeCalled()
    expect(withdrawSpy).toBeCalledTimes(1)
  })

  it.each([
    ['Digit1', ButtonValue.One],
    ['Numpad1', ButtonValue.One],
    ['Digit2', ButtonValue.Two],
    ['Numpad2', ButtonValue.Two],
    ['Digit3', ButtonValue.Three],
    ['Numpad3', ButtonValue.Three],
    ['Digit4', ButtonValue.Four],
    ['Numpad4', ButtonValue.Four],
    ['Digit5', ButtonValue.Five],
    ['Numpad5', ButtonValue.Five],
    ['Digit6', ButtonValue.Six],
    ['Numpad6', ButtonValue.Six],
    ['Digit7', ButtonValue.Seven],
    ['Numpad7', ButtonValue.Seven],
    ['Digit8', ButtonValue.Eight],
    ['Numpad8', ButtonValue.Eight],
    ['Digit9', ButtonValue.Nine],
    ['Numpad9', ButtonValue.Nine],
    ['Digit0', ButtonValue.Zero],
    ['Numpad0', ButtonValue.Zero],
    ['Backspace', ButtonValue.Del],
  ])(
    'it should call handlePad to send keypad signal from keyboard (key = %s)',
    (key, buttonValue) => {
      renderHook(() => useKeyboardInput())

      act(() => {
        fireEvent.keyDown(window, { code: key })
      })

      expect(withdrawSpy).not.toBeCalled()
      expect(handlePadSpy).toBeCalledTimes(1)
      expect(handlePadSpy).toBeCalledWith(buttonValue)
    }
  )
})
