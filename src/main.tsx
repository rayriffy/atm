import ReactDOM from 'react-dom/client'
import { Routes } from '@generouted/react-router'

import { ChakraProvider, Container } from '@chakra-ui/react'
import { theme } from '$chakra/constants'

import '@fontsource-variable/noto-sans-thai'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <Container maxW="sm" minH="100vh" py={12} position="relative">
      <Routes />
    </Container>
  </ChakraProvider>
)
