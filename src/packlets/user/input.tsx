import { Heading } from '@chakra-ui/react'

import { useWithdrawInput } from './useWithdrawInput'

export const Input = () => {
  const { value } = useWithdrawInput()
  return (
    <Heading fontSize="7xl" pt={12} textAlign="right">
      £{value.toLocaleString()}
    </Heading>
  )
}
