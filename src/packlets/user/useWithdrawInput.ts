import { useMemo } from 'react'
import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

import { ErrorCode } from '$bank/constants'
import { useWithdrawAtom, withdrawAtom } from '$context/withdrawAtom'
import { padLockAtom } from '$context/padLockAtom'

import { withdraw as callWithdraw } from './withdraw'

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
