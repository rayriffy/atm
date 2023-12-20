import { Fragment } from 'react'
import { HStack, Heading, Spacer, VStack } from '@chakra-ui/react'

import { Pad } from '$pad'
import { Inventory } from '$user/inventory'
import { Balance } from '$user/balance'
import { handlePad } from '$user/handlePad'
import { Input } from '$user/input'
import { WithdrawButton } from '$user/withdrawButton'
import { Overdrawn } from '$user/overdrawn'
import { useKeyboardInput } from '$user/useKeyboardInput'
import { ErrorDecoder } from '$user/errorDecoder'

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
