import { render, act } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Page from './app'

const propsSpy = vi.fn()
const {
  handlePadSpy,
  useKeyboardInputSpy,
  PadSpy,
  BalanceSpy,
  ErrorDecoderSpy,
  InputSpy,
  InventorySpy,
  OverdrawnSpy,
  WithdrawButtonSpy,
} = vi.hoisted(() => ({
  handlePadSpy: vi.fn(),
  useKeyboardInputSpy: vi.fn(),
  PadSpy: vi.fn((props: PropsWithChildren) => {
    propsSpy(props)
    return <div>Pad{props.children}</div>
  }),
  BalanceSpy: vi.fn(() => <div>Balance</div>),
  ErrorDecoderSpy: vi.fn(() => <div>ErrorDecoder</div>),
  InputSpy: vi.fn(() => <div>Input</div>),
  InventorySpy: vi.fn(() => <div>Inventory</div>),
  OverdrawnSpy: vi.fn(() => <div>Overdrawn</div>),
  WithdrawButtonSpy: vi.fn(() => <div>WithdrawButton</div>),
}))

vi.mock('$pad', () => ({
  Pad: PadSpy,
}))

vi.mock('$user/handlePad', () => ({
  handlePad: handlePadSpy,
}))

vi.mock('$user/useKeyboardInput', () => ({
  useKeyboardInput: useKeyboardInputSpy,
}))

vi.mock('$user/balance', () => ({
  Balance: BalanceSpy,
}))

vi.mock('$user/errorDecoder', () => ({
  ErrorDecoder: ErrorDecoderSpy,
}))

vi.mock('$user/input', () => ({
  Input: InputSpy,
}))

vi.mock('$user/inventory', () => ({
  Inventory: InventorySpy,
}))

vi.mock('$user/overdrawn', () => ({
  Overdrawn: OverdrawnSpy,
}))

vi.mock('$user/withdrawButton', () => ({
  WithdrawButton: WithdrawButtonSpy,
}))

describe('<Page />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render page with all components', () => {
    const { container } = render(<Page />)

    expect(PadSpy).toBeCalledTimes(1)
    expect(BalanceSpy).toBeCalledTimes(1)
    expect(ErrorDecoderSpy).toBeCalledTimes(1)
    expect(InputSpy).toBeCalledTimes(1)
    expect(InventorySpy).toBeCalledTimes(1)
    expect(OverdrawnSpy).toBeCalledTimes(1)
    expect(WithdrawButtonSpy).toBeCalledTimes(1)

    expect(container).toMatchSnapshot()
  })

  it('should pass onClick to Pad', () => {
    render(<Page />)

    expect(PadSpy).toBeCalledTimes(1)

    act(() => {
      propsSpy.mock.calls[0][0].onClick()
    })

    expect(handlePadSpy).toBeCalledTimes(1)
  })
})
