import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig(() =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
          reporter: ['text', 'json', 'html'],
          include: ['**/src/pages/**', '**/src/packlets/**'],
          exclude: [
            '**/constants.ts',
            '**/types.ts',
            '**/context/**',
            '**/*.d.ts',
          ],
        },
        setupFiles: ['./test/setup.ts'],
      },
    })
  )
)
