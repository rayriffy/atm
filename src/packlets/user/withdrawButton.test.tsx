import { render, act } from '@testing-library/react'
import { describe, it, vi, expect, beforeEach } from 'vitest'

import { WithdrawButton } from './withdrawButton'

const withdrawSpy = vi.hoisted(() => vi.fn())
const useWithdrawInputSpy = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    loading: false,
    value: 0,
    withdraw: withdrawSpy,
  })
)

vi.mock('./useWithdrawInput', () => ({
  useWithdrawInput: useWithdrawInputSpy,
}))

describe('<WithdrawButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be disabled if value is at 0', () => {
    const { container, getByText } = render(<WithdrawButton />)

    expect(container.querySelector('button')?.attributes).toHaveProperty(
      'disabled'
    )
    expect(getByText('Withdraw')).toBeDefined()
  })

  it('should call withdraw when clicked', () => {
    useWithdrawInputSpy.mockReturnValue({
      loading: false,
      value: 100,
      withdraw: withdrawSpy,
    })

    const { container } = render(<WithdrawButton />)
    const button = container.querySelector('button')!

    expect(button.attributes).not.toHaveProperty('disabled')
    expect(withdrawSpy).not.toBeCalled()

    act(() => {
      button.click()
    })

    expect(withdrawSpy).toBeCalledTimes(1)
  })
})
