import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        include: ['**/*.spec.ts'],
        exclude: ['packages/template/*'],
        environment: "happy-dom",
    },
}))