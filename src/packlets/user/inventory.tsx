import { Grid, GridItem, HStack, Text } from '@chakra-ui/react'

import { Banknote } from '$bank/banknote'
import { Note } from '$bank/constants'
import { useUserInventoryAtom } from '$context/userInventoryAtom'

export const Inventory = () => {
  const inventory = useUserInventoryAtom()

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      {Object.values(Note).map(note => (
        <GridItem key={`inventory-note-${note}`} as={HStack} spacing={4}>
          <Banknote type={note} />
          <Text>{inventory[note]}</Text>
        </GridItem>
      ))}
    </Grid>
  )
}
