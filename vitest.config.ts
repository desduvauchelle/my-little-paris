import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			// The SDK's client components import 'next/link' extensionless, which
			// Vite's node resolver can't resolve from the package. Pointing at the
			// real file lets page modules that pull in SDK components be imported
			// here (e.g. the metadata tests).
			'next/link': fileURLToPath(new URL('./node_modules/next/link.js', import.meta.url)),
		},
	},
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.unit.test.ts'],
		exclude: ['node_modules', '.next'],
		// The SDK is shipped as source that imports 'next/link' extensionless;
		// it has to go through Vite (and the alias above) rather than Node's
		// resolver, or any test importing a page that renders SDK components fails.
		server: { deps: { inline: ['@growth-engine/sdk-client'] } },
	},
})
