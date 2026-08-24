import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { CrawlableBlogList } from './CrawlableBlogList'

vi.mock('next/link', async () => {
	const { createElement } = await import('react')
	return {
		default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
			createElement('a', { href, ...props }, children),
	}
})

vi.mock('@growth-engine/sdk-client/components', async () => {
	const { createElement } = await import('react')
	return {
		BlogSearch: ({ placeholder }: { placeholder: string }) =>
			createElement('input', { placeholder }),
		BlogCard: ({ slug, localePrefix }: { slug: string; localePrefix: string }) =>
			createElement('a', { href: `${localePrefix}/blog/${slug}` }, slug),
	}
})

const posts = Array.from({ length: 27 }, (_, index) => ({
	slug: `post-${index + 1}`,
	title: `Post ${index + 1}`,
	content: `Content ${index + 1}`,
	heroImageUrl: null,
	seoDesc: null,
	createdAt: '2026-01-01T00:00:00.000Z',
}))

const translations = {
	noPostsMessage: 'No posts',
	clearSearchLabel: 'Clear search',
	searchPlaceholder: 'Search',
}

function renderPage(initialPage: number) {
	return renderToStaticMarkup(
		createElement(CrawlableBlogList, {
			posts,
			locale: 'en',
			localePrefix: '',
			translations,
			initialPage,
		}),
	)
}

describe('CrawlableBlogList', () => {
	it('renders crawlable pagination URLs in the initial HTML', () => {
		const html = renderPage(1)

		expect(html).toContain('href="/blog?page=2"')
		expect(html).toContain('href="/blog?page=3"')
		expect(html).toContain('href="/blog/post-1"')
		expect(html).not.toContain('href="/blog/post-10"')
	})

	it('server-renders the requested page of post links', () => {
		const html = renderPage(2)

		expect(html).toContain('href="/blog/post-10"')
		expect(html).toContain('href="/blog/post-18"')
		expect(html).not.toContain('href="/blog/post-9"')
		expect(html).not.toContain('href="/blog/post-19"')
	})
})
