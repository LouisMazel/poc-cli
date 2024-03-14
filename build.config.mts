import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    name: 'cli',
    rollup: {
      inlineDependencies: true,
      // output: {
      //   entryFileNames: '[name].js',
      // },
      resolve: {
        exportConditions: ['production', 'node'],
      },
    },
    entries: ['src/cli'],
    outDir: 'dist',
    clean: true,
    externals: [],
    declaration: true,
  },
])
