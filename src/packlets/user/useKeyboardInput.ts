import { useEffect } from 'react'

import { handlePad } from './handlePad'
import { useWithdrawInput } from './useWithdrawInput'

import { ButtonValue } from '$pad/constants'

export const useKeyboardInput = () => {
  const { value, withdraw } = useWithdrawInput()

  const handleKeyPress = ({ code }: KeyboardEvent) => {
    switch (code) {
      case 'Digit1':
      case 'Numpad1':
        handlePad(ButtonValue.One)
        break
      case 'Digit2':
      case 'Numpad2':
        handlePad(ButtonValue.Two)
        break
      case 'Digit3':
      case 'Numpad3':
        handlePad(ButtonValue.Three)
        break
      case 'Digit4':
      case 'Numpad4':
        handlePad(ButtonValue.Four)
        break
      case 'Digit5':
      case 'Numpad5':
        handlePad(ButtonValue.Five)
        break
      case 'Digit6':
      case 'Numpad6':
        handlePad(ButtonValue.Six)
        break
      case 'Digit7':
      case 'Numpad7':
        handlePad(ButtonValue.Seven)
        break
      case 'Digit8':
      case 'Numpad8':
        handlePad(ButtonValue.Eight)
        break
      case 'Digit9':
      case 'Numpad9':
        handlePad(ButtonValue.Nine)
        break
      case 'Digit0':
      case 'Numpad0':
        handlePad(ButtonValue.Zero)
        break
      case 'Backspace':
        handlePad(ButtonValue.Del)
        break
      case 'Enter':
        withdraw()
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [value])
}
