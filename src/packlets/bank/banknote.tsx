import { Box, Text } from '@chakra-ui/react'
import { memo } from 'react'

import { Note } from './constants'

interface Props {
  type: Note
}

export const Banknote = memo(({ type }: Props) => (
  <Box px={3} py={0.5} border="2px" borderColor="black" rounded="md">
    <Text fontSize="sm" fontWeight="bold">
      {type}
    </Text>
  </Box>
))
