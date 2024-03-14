/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const _dirname = fileURLToPath(new URL('.', import.meta.url))

const projectRoot = resolve(_dirname)

export default defineConfig({
  server: {
    port: 1111,
  },
  test: {
    env: {
      TZ: 'UTC',
    },
    globals: true,
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['clover', 'html'],
      include: ['src'],
      extension: ['.js', '.ts'],
      exclude: ['src/cli.ts'],
    },
  },
  resolve: {
    alias: {
      src: resolve(projectRoot, 'src'),
    },
  },
})
