import { Container, Grid, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { PinButton } from './button'
import { ButtonValue } from './constants'

interface Props extends PropsWithChildren {
  onClick?: (value: ButtonValue) => void
}

export const Pad = ({ onClick, children }: Props) => {
  return (
    <Container as={VStack} spacing={6} align='stretch' maxW="sm" position="fixed" bottom={0} left={0} right={0} p={6}>
      {children}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {Object.values(ButtonValue).map(o => (
          <PinButton
            key={`pad-key-${o}`}
            value={o}
            colStart={o === ButtonValue.Zero ? 2 : undefined}
            onClick={() => onClick?.(o)}
          />
        ))}
      </Grid>
    </Container>
  )
}
