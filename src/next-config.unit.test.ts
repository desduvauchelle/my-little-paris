import { describe, expect, it } from 'vitest'
import nextConfig from '../next.config'

describe('next.config redirects', () => {
	it('permanently redirects the obsolete soft-opening menu to the current menu', async () => {
		const redirects = await nextConfig.redirects?.()

		expect(redirects).toContainEqual({
			source: '/menu-soft-opening',
			destination: '/menu',
			statusCode: 301,
		})
	})
})
