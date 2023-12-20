import { useAuth } from '$auth/useAuth'
import { Pad } from '$pad'
import { Spinner, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const Page = () => {
  // global auth controller
  const { ready } = useAuth('app')

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
