import createExternalOptionFunction from '@niche-works/dev/createExternalOptionFunction';
import distPackage from '@niche-works/rollup-plugin-dist-package';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
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
    inject: true,
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
          './core/*': {
            import: './core/*/index.mjs',
            require: './core/*/index.cjs',
          },
          './core/constants': {
            import: './core/constants.mjs',
            require: './core/constants.cjs',
          },
          './helpers/*': {
            import: './helpers/*.mjs',
            require: './helpers/*.cjs',
          },
          './core/styles.css': './core/styles.css',
          './core/*.css': './core/*/styles.css',
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
    {
      name: 'fix-css-cjs-extension',
      renderChunk(code, _, options) {
        if (options.format !== 'cjs') {
          return null;
        }
        return {
          code: code.replace(
            /require\((['"])([^'"]*\/styles)\.cjs\1\)/g,
            'require($1$2.css$1)',
          ),
          map: null,
        };
      },
    },
  ],
});
