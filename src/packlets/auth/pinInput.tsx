import {
  HStack,
  PinInput as ChakraPinInput,
  PinInputField,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Fragment } from 'react'

import { usePinInput } from './usePinInput'

export const PinInput = () => {
  const { pin, setPin, loading, error } = usePinInput()

  return (
    <Fragment>
      <HStack py={12} justify="center">
        <ChakraPinInput
          size="lg"
          mask
          variant="flushed"
          value={pin}
          onChange={setPin}
          isDisabled={loading}
          isInvalid={error}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </ChakraPinInput>
      </HStack>
      {error && (
        <Alert status="error" variant="solid" rounded="md">
          <AlertIcon />
          Pin is incorrect
        </Alert>
      )}
    </Fragment>
  )
}
