import { Alert, AlertIcon } from "@chakra-ui/react"

import { useWithdrawInput } from "./useWithdrawInput"
import { decodeError } from "./decodeError"

export const ErrorDecoder = () => {
  const { error } = useWithdrawInput()

  if (error === null) return null

  return (
    <Alert status="error" rounded="md" variant="solid">
      <AlertIcon />
      {decodeError(error)}
    </Alert>
  )
}
