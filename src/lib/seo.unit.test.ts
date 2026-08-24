import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('buildPageMetadata', () => {
	const originalEnv = process.env

	beforeEach(() => {
		vi.resetModules()
		process.env = { ...originalEnv, SITE_URL: 'https://example.com' }
		vi.doMock('@/i18n/config', () => ({
			defaultLocale: 'en',
			supportedLocales: ['en', 'fr', 'zh'],
			isMultiLang: true,
		}))
	})

	afterEach(() => {
		process.env = originalEnv
	})

	it('uses explicit translated article URLs instead of reusing the current slug', async () => {
		const { buildPageMetadata } = await import('./seo')
		const metadata = buildPageMetadata({
			path: '/blog/article-fr',
			locale: 'fr',
			title: 'Article',
			languageAlternates: {
				en: 'https://example.com/blog/article-en',
				fr: 'https://example.com/fr/blog/article-fr',
				zh: 'https://example.com/zh/blog/article-zh',
			},
		})

		expect(metadata.alternates?.languages).toEqual({
			en: 'https://example.com/blog/article-en',
			fr: 'https://example.com/fr/blog/article-fr',
			zh: 'https://example.com/zh/blog/article-zh',
			'x-default': 'https://example.com/blog/article-en',
		})
	})
})
