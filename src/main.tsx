import { ChakraProvider, Container } from '@chakra-ui/react'
import { Routes } from '@generouted/react-router'
import ReactDOM from 'react-dom/client'

import { theme } from '$chakra/constants'

import '@fontsource-variable/noto-sans-thai'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <Container maxW="sm" minH="100vh" py={12} position="relative">
      <Routes />
    </Container>
  </ChakraProvider>
)
