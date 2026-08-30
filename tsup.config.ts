import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/element.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
  minify: false,
  sourcemap: true,
  treeshake: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
})
