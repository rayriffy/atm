import { useCallback, useEffect, useState } from 'react'

import { pinAtom, usePinAtom } from '$context/pinAtom'
import { authenticatedAtom } from '$context/authenticatedAtom'
import { balanceAtom } from '$context/balanceAtom'
import { padLockAtom } from '$context/padLockAtom'

import { APIPin } from './types'

export const usePinInput = () => {
  const pin = usePinAtom()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // atom setter
  const setPin = (value: string) => pinAtom.set(value)

  const handleLogin = useCallback(() => {
    // set initial loading state
    setLoading(true)
    setError(false)
    padLockAtom.set(true)

    // call for login
    fetch('https://frontend-challenge.screencloud-michael.now.sh/api/pin', {
      method: 'POST',
      body: JSON.stringify({ pin }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(o => {
        // if non-200 response, throw error
        if (!o.ok) throw o
        else return o.json() as Promise<APIPin>
      })
      // if success, set balance and authenticated state
      .then(o => {
        balanceAtom.set(o.currentBalance)
        authenticatedAtom.set(true)
      })
      // if error, set error state
      .catch(() => setError(true))
      .finally(() => {
        padLockAtom.set(false)
        setLoading(false)
      })
  }, [pin])

  useEffect(() => {
    if (pin.length === 4) handleLogin()
  }, [pin])

  return {
    pin,
    setPin,
    loading,
    error,
    handleLogin,
  }
}
