import { HStack, Heading, Spacer, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { Pad } from '$pad'

import { Balance } from '$user/balance'
import { ErrorDecoder } from '$user/errorDecoder'
import { handlePad } from '$user/handlePad'
import { Input } from '$user/input'
import { Inventory } from '$user/inventory'
import { Overdrawn } from '$user/overdrawn'
import { useKeyboardInput } from '$user/useKeyboardInput'
import { WithdrawButton } from '$user/withdrawButton'

const Page = () => {
  useKeyboardInput()

  return (
    <Fragment>
      <VStack align="stretch" h="100%" spacing={4}>
        <HStack>
          <Heading>Withdraw</Heading>
          <Spacer />
          <Balance />
        </HStack>
        <Input />
        <ErrorDecoder />
      </VStack>
      <Pad onClick={handlePad}>
        <Inventory />
        <HStack>
          <Overdrawn />
          <Spacer />
          <WithdrawButton />
        </HStack>
      </Pad>
    </Fragment>
  )
}

export default Page
