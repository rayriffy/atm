import { Spinner, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import { Pad } from '$pad'

import { useAuth } from '$auth/useAuth'

const Page = () => {
  // global auth controller
  const { ready } = useAuth('auth')

  if (!ready)
    return (
      <Fragment>
        <VStack py={12}>
          <Spinner />
        </VStack>
        <Pad />
      </Fragment>
    )

  return <Outlet />
}

export default Page
