import { useNavigate } from '$router'
import { useEffect } from 'react'

const Page = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/atm')
  }, [])

  return null
}

export default Page
