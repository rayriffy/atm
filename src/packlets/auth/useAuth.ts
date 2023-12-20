import { useEffect, useState } from 'react'

import { useNavigate } from '$router'

import { useAuthenticatedAtom } from '$context/authenticatedAtom'

// global hook to handle authentication status of user
export const useAuth = (section: 'auth' | 'app') => {
  const [ready, setReady] = useState(false)

  const authenticated = useAuthenticatedAtom()
  const navigate = useNavigate()

  useEffect(() => {
    // trigger when
    // 1. in auth section and authenticated
    // 2. in app section and not authenticated
    if (authenticated === (section === 'auth'))
      navigate(section === 'auth' ? '/app' : '/')

    // app ready to render
    setReady(true)
  }, [authenticated])

  return { ready }
}
