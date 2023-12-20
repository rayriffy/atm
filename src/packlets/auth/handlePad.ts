import { pinAtom } from '$context/pinAtom'
import { ButtonValue } from '$pad/constants'

export const handlePad = (value: ButtonValue) => {
  const atomValue = pinAtom.get()
  if (value === 'DEL') pinAtom.set(atomValue.slice(0, -1))
  else if (atomValue.length <= 4) pinAtom.set(atomValue + value)
}
