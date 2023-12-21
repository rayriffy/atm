import { render } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { Input } from './input'

const { useWithdrawInputSpy } = vi.hoisted(() => ({
  useWithdrawInputSpy: vi.fn(() => ({
    value: 0,
  })),
}))

vi.mock('./useWithdrawInput', () => ({
  useWithdrawInput: useWithdrawInputSpy,
}))

describe('<Input />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render input', () => {
    const { container } = render(<Input />)

    expect(container).toMatchSnapshot()
  })

  it('should render comma in value', () => {
    useWithdrawInputSpy.mockReturnValue({ value: 123456789 })

    const { getByText } = render(<Input />)

    expect(getByText('£123,456,789')).toBeDefined()
  })
})
