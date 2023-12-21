import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorDecoder } from './errorDecoder'

import { ErrorCode } from '$bank/constants'


const { useWithdrawInputSpy, decodeErrorSpy } = vi.hoisted(() => ({
  useWithdrawInputSpy: vi.fn<unknown[], { error: ErrorCode | null }>(() => ({
    error: null,
  })),
  decodeErrorSpy: vi.fn().mockReturnValue('mock-error'),
}))

vi.mock('./decodeError', () => ({
  decodeError: decodeErrorSpy,
}))

vi.mock('./useWithdrawInput', () => ({
  useWithdrawInput: useWithdrawInputSpy,
}))

describe('decodeError', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render nothing if no error', () => {
    useWithdrawInputSpy.mockReturnValue({ error: null })

    const { container } = render(<ErrorDecoder />)

    expect(container.firstChild).toBeNull()
    expect(container).toMatchSnapshot()
  })

  it.each(Object.values(ErrorCode))(
    'should render decoded error (code = %s)',
    errorCode => {
      useWithdrawInputSpy.mockReturnValue({ error: errorCode })
      decodeErrorSpy.mockReturnValue(errorCode)

      const { container, getByText } = render(<ErrorDecoder />)

      expect(decodeErrorSpy).toBeCalledTimes(1)
      expect(decodeErrorSpy).toBeCalledWith(errorCode)
      expect(getByText(errorCode)).toBeDefined()

      expect(container).toMatchSnapshot()
    }
  )
})
