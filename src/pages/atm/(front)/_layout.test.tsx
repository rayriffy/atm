import { render } from '@testing-library/react'
import { describe, it, vi, expect, beforeEach } from 'vitest'

import Layout from './_layout'

const { useAuthSpy, OutletSpy, PadSpy } = vi.hoisted(() => ({
  useAuthSpy: vi.fn().mockReturnValue({
    ready: false,
  }),
  OutletSpy: vi.fn(() => <div>Outlet</div>),
  PadSpy: vi.fn(() => <div>Pad</div>),
}))

vi.mock('react-router-dom', () => ({
  Outlet: OutletSpy,
}))

vi.mock('$auth/useAuth', () => ({
  useAuth: useAuthSpy,
}))

vi.mock('$pad', () => ({
  Pad: PadSpy,
}))

describe('<Layout />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading skeleton while checking authentication', () => {
    const { container } = render(<Layout />)

    expect(useAuthSpy).toBeCalledTimes(1)
    expect(useAuthSpy).toBeCalledWith('auth')

    expect(PadSpy).toBeCalledTimes(1)
    expect(OutletSpy).not.toBeCalled()

    expect(container).toMatchSnapshot()
  })

  it('should render outlet when authentication is checked', () => {
    useAuthSpy.mockReturnValue({
      ready: true,
    })
    const { container } = render(<Layout />)

    expect(OutletSpy).toBeCalledTimes(1)

    expect(container).toMatchSnapshot()
  })
})
