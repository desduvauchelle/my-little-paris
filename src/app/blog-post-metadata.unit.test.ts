import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBlogPost } from '@growth-engine/sdk-server'
import BlogPostPage, { generateMetadata } from './[locale]/blog/[slug]/page'
import { SITE_URL } from '@/lib/sitemap-shared'

vi.mock('@growth-engine/sdk-server', () => ({
	getBlogPost: vi.fn(),
	getBlogPosts: async () => [],
	getBusinessConfig: async () => null,
	getBlogAuthorById: async () => null,
}))
vi.mock('@/lib/db', () => ({
	getDb: () => ({}),
	safeQuery: (_fallback: unknown, query: () => Promise<unknown>) => query(),
}))
vi.mock('@/lib/sitemap-shared', async (importOriginal) => ({
	...await importOriginal<typeof import('@/lib/sitemap-shared')>(),
	buildBlogLanguageAlternates: async () => ({}),
}))

describe('blog post canonical metadata', () => {
	beforeEach(() => vi.clearAllMocks())

	it.each([
		['en', 'family-play', '/blog/family-play'],
		['fr', 'jeux-en-famille', '/fr/blog/jeux-en-famille'],
		['zh', 'family-guide', '/zh/blog/family-guide'],
	])('uses the requested %s post URL, independently of translation discovery', async (locale, slug, path) => {
		vi.mocked(getBlogPost).mockResolvedValue({
			slug, title: 'Family play', seoTitle: null, seoDesc: null, heroImageUrl: null,
		} as Awaited<ReturnType<typeof getBlogPost>>)
		const metadata = await generateMetadata({ params: Promise.resolve({ locale, slug }) })
		expect(getBlogPost).toHaveBeenCalledWith({}, slug, locale)
		expect(metadata.alternates?.canonical).toBe(`${SITE_URL}${path}`)
		expect(metadata.openGraph).toMatchObject({ url: `${SITE_URL}${path}`, type: 'article' })
	})

	it('does not advertise a canonical for a missing post', async () => {
		vi.mocked(getBlogPost).mockResolvedValue(null)
		expect(await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'missing' }) })).toEqual({})
	})
})

it('renders the actual post route with database-format keywords and its canonical JSON-LD URL', async () => {
	vi.mocked(getBlogPost).mockResolvedValue({
		slug: 'family-play', title: 'Family play', content: 'A family day out.',
		language: 'en', createdAt: '2026-09-14T00:00:00.000Z',
		keywords: '["play cafe","San Gabriel"]',
	} as unknown as Awaited<ReturnType<typeof getBlogPost>>)
	const html = renderToStaticMarkup(await BlogPostPage({
		params: Promise.resolve({ locale: 'en', slug: 'family-play' }),
	}))
	expect(html).toContain('A family day out.')
	expect(html).toContain('"keywords":"play cafe, San Gabriel"')
	expect(html).toContain(`"@id":"${SITE_URL}/blog/family-play"`)
	expect(html).toContain('href="/blog"')
})
