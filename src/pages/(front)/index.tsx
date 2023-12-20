import { Fragment } from 'react'
import { Heading, VStack } from '@chakra-ui/react'

import { Pad } from '$pad'
import { PinInput } from '$auth/pinInput'
import { handlePad } from '$auth/handlePad'

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
