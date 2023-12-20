import { Heading, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { Pad } from '$pad'

import { handlePad } from '$auth/handlePad'
import { PinInput } from '$auth/pinInput'

const Page = () => {
  return (
    <Fragment>
      <VStack align="stretch" h="100%" spacing={4}>
        <Heading>ATM</Heading>
        <PinInput />
      </VStack>
      <Pad onClick={handlePad} />
    </Fragment>
  )
}

export default Page
