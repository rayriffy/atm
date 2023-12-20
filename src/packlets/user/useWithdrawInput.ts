import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'
import { useMemo } from 'react'

import { withdraw as callWithdraw } from './withdraw'

import { ErrorCode } from '$bank/constants'
import { padLockAtom } from '$context/padLockAtom'
import { useWithdrawAtom, withdrawAtom } from '$context/withdrawAtom'

const loadingAtom = atom(false)
const errorAtom = atom<ErrorCode | null>(null)

export const useWithdrawInput = () => {
  const loading = useStore(loadingAtom)
  const error = useStore(errorAtom)

  const withdrawString = useWithdrawAtom()

  const value = useMemo(
    () => (withdrawString === '' ? 0 : Number(withdrawString)),
    [withdrawString]
  )

  const withdraw = () => {
    loadingAtom.set(true)
    errorAtom.set(null)
    padLockAtom.set(true)

    callWithdraw(value)
      .catch((e: ErrorCode) => {
        errorAtom.set(e)
      })
      .finally(() => {
        // reset input
        withdrawAtom.set('')

        // unlock inputs
        padLockAtom.set(false)
        loadingAtom.set(false)
      })
  }

  return { value, loading, error, withdraw }
}
