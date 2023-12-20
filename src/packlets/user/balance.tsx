import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import { useBalanceAtom } from '$context/balanceAtom'

export const Balance = () => {
  const balance = useBalanceAtom()

  return (
    <Stat textAlign="right">
      <StatLabel>Balance</StatLabel>
      <StatNumber>£{balance.toLocaleString()}</StatNumber>
    </Stat>
  )
}
