import { Button, GridItem, GridItemProps, Heading } from '@chakra-ui/react'
import { Icon } from 'react-iconify-icon-wrapper'

import { ButtonValue } from './constants'

import { usePadLockAtom } from '$context/padLockAtom'

interface Props extends GridItemProps {
  onClick: () => void
  value: ButtonValue
}

export const PinButton = ({ onClick, value, ...rest }: Props) => {
  const lock = usePadLockAtom()

  return (
    <GridItem mx="auto" {...rest}>
      <Button
        rounded="9999px"
        size="lg"
        variant="ghost"
        aspectRatio={1}
        onClick={onClick}
        isDisabled={lock}
      >
        {value !== ButtonValue.Del ? (
          <Heading size="md">{value}</Heading>
        ) : (
          <Icon icon="lucide:delete" width={24} />
        )}
      </Button>
    </GridItem>
  )
}
