import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

export default defineConfig([
  globalIgnores([
    '.next/**',
    '.claude/**',
    'node_modules/**',
    'out/**',
    'next-env.d.ts',
    'src/generated/**',
  ]),
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // react-hooks v7 compiler-era rules, warn-only until the flagged
      // components are refactored (next lint / react-hooks v5 never ran these)
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/use-memo': 'warn',
    },
  },
])
