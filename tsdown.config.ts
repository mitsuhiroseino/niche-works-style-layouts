import createExternalOptionFunction from '@niche-works/dev/createExternalOptionFunction';
import distPackage from '@niche-works/rollup-plugin-dist-package';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  css: {
    inject: false,
  },
  inputOptions: {
    external: createExternalOptionFunction(),
  },
  outputOptions: {
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    distPackage({
      content: {
        main: './index.cjs',
        module: './index.mjs',
        sideEffects: ['**/*.css'],
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.cjs',
          },
          './*': {
            import: './*/index.mjs',
            require: './*/index.cjs',
          },
          './constants': {
            import: './constants.mjs',
            require: './constants.cjs',
          },
          './*/constants': {
            import: './*/constants.mjs',
            require: './*/constants.cjs',
          },
          './styles.css': './styles.css',
          './stack.css': './stack/stack.css',
          './flow.css': './flow/flow.css',
          './matrix.css': './matrix/matrix.css',
          './tile.css': './tile/tile.css',
          './balance.css': './balance/balance.css',
          './pack.css': './pack/pack.css',
          './pin.css': './pin/pin.css',
        },
      },
    }),
    copy({
      targets: [
        {
          src: ['LICENSE', 'README.md', 'README.ja.md'],
          dest: 'dist',
        },
      ],
    }),
  ],
});
