import { useEffect } from 'react'

import { useNavigate } from '$router'

const Page = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/atm')
  }, [])

  return null
}

export default Page
