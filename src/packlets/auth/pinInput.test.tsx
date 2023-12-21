import { render, act, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { PinInput } from './pinInput'

const setPinSpy = vi.hoisted(() => vi.fn())
const usePinInputSpy = vi.hoisted(() =>
  vi.fn(() => ({
    pin: '',
    setPin: setPinSpy,
    loading: false,
    error: false,
  }))
)
vi.mock('./usePinInput', () => ({
  usePinInput: usePinInputSpy,
}))

describe('<PinInput />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render and match snapshot', () => {
    const { container } = render(<PinInput />)

    expect(container).toMatchSnapshot()
  })

  it('should call setPin when type', () => {
    const { container } = render(<PinInput />)

    const input = container.querySelector('input')

    act(() => {
      fireEvent.change(input!, { target: { value: '1' } })
    })

    expect(setPinSpy).toBeCalledTimes(1)
    expect(setPinSpy).toHaveBeenCalledWith('1')
  })

  it('should disable input when loading', () => {
    usePinInputSpy.mockReturnValueOnce({
      pin: '',
      setPin: setPinSpy,
      loading: true,
      error: false,
    })

    const { container } = render(<PinInput />)

    const input = container.querySelector('input')

    expect(input?.attributes).toHaveProperty('disabled')
  })

  it("should show alert when there's an error", () => {
    usePinInputSpy.mockReturnValueOnce({
      pin: '',
      setPin: setPinSpy,
      loading: false,
      error: true,
    })

    const { getByText } = render(<PinInput />)

    expect(getByText('Pin is incorrect')).toBeDefined()
  })
})
