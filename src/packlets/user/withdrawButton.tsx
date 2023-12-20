import { Button } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { useWithdrawInput } from './useWithdrawInput'

export const WithdrawButton = () => {
  const { loading, value, withdraw } = useWithdrawInput()

  return (
    <Button
      variant="black"
      size="sm"
      rightIcon={<Icon icon="lucide:arrow-right" width={16} />}
      lineHeight={1}
      onClick={withdraw}
      isLoading={loading}
      isDisabled={value === 0}
    >
      Withdraw
    </Button>
  )
}
