import generouted from '@generouted/react-router/plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CI === 'true' ? '/atm' : undefined,
  plugins: [react(), generouted(), tsconfigPaths()],
})
