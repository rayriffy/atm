import { render, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Pad } from './'

const propsSpy = vi.fn()
vi.mock('./button', () => ({
  PadButton: (props: unknown) => {
    propsSpy(props)
    return <div>PadButton</div>
  },
}))

describe('<Pad />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<Pad />)
    expect(container).toMatchSnapshot()
  })

  it('should render 11 buttons (10 number + 1 del)', () => {
    render(<Pad />)
    expect(propsSpy).toBeCalledTimes(11)
  })

  it('should be able to click a button', () => {
    const onClickSpy = vi.fn()
    render(<Pad onClick={onClickSpy} />)

    expect(onClickSpy).not.toBeCalled()

    act(() => {
      propsSpy.mock.calls[0][0].onClick()
    })

    expect(onClickSpy).toBeCalledTimes(1)
    expect(onClickSpy).toBeCalledWith('1')
  })
})
