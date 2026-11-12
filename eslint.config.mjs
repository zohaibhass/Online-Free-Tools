import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // This codebase intentionally hydrates browser/localStorage state in effects.
      // React Compiler is not enabled, so compiler-only lint diagnostics are not blockers.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/unsupported-syntax': 'off',
      'react-hooks/purity': 'off',
      // Keep legacy content issues visible while allowing lint to become a usable gate.
      'react/no-unescaped-entities': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-before-interactive-script-outside-document': 'warn',
    },
  },
  globalIgnores(['.next/**', 'coverage/**', 'next-env.d.ts', 'public/sw.js']),
])
