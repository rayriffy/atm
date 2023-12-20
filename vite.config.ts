import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CI === 'true' ? '' : undefined,
  plugins: [
    react(),
    generouted(),
    tsconfigPaths(),
  ],
})
