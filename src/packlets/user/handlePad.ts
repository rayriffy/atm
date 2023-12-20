import { withdrawAtom } from '$context/withdrawAtom'
import { ButtonValue } from '$pad/constants'

export const handlePad = (value: ButtonValue) => {
  const atomValue = withdrawAtom.get()
  if (value === 'DEL') withdrawAtom.set(atomValue.slice(0, -1))
  else if (atomValue.length <= 10) withdrawAtom.set(atomValue + value)
}
