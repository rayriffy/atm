import { HStack, Text } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { useBalanceAtom } from '$context/balanceAtom'

export const Overdrawn = () => {
  const balance = useBalanceAtom()

  if (balance > 0) return null

  return (
    <HStack bg="orange.600" color="white" rounded="md" px={2.5} py={2}>
      <Icon icon="lucide:alert-triangle" width={16} height={16} />
      <Text fontWeight="semibold" fontSize="sm" lineHeight={1}>
        Account overdrawn
      </Text>
    </HStack>
  )
}
