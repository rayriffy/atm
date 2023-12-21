import { render, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import Page from '.'

const propsSpy = vi.fn()
const { handlePadSpy, PinInputSpy, PadSpy } = vi.hoisted(() => ({
  handlePadSpy: vi.fn(),
  PinInputSpy: vi.fn(() => <div>PinInput</div>),
  PadSpy: vi.fn((props: unknown) => {
    propsSpy(props)
    return <div>Pad</div>
  }),
}))

vi.mock('$pad', () => ({
  Pad: PadSpy,
}))
vi.mock('$auth/handlePad', () => ({
  handlePad: handlePadSpy,
}))
vi.mock('$auth/pinInput', () => ({
  PinInput: PinInputSpy,
}))

describe('<Page />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render page with all components', () => {
    const { container } = render(<Page />)

    expect(PinInputSpy).toBeCalledTimes(1)
    expect(PadSpy).toBeCalledTimes(1)

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
