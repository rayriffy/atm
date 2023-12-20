import { Alert, AlertIcon } from "@chakra-ui/react"

import { decodeError } from "./decodeError"
import { useWithdrawInput } from "./useWithdrawInput"

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
