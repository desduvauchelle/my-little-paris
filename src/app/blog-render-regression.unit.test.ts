import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBlogPost, getBlogPosts } from '@growth-engine/sdk-server'
import BlogPostPage from './[locale]/blog/[slug]/page'

vi.mock('@growth-engine/sdk-server', () => ({
	getBlogPost: vi.fn(),
	getBlogPosts: vi.fn(),
	getBlogAuthorById: vi.fn(),
	getBusinessConfig: vi.fn().mockResolvedValue(null),
}))
vi.mock('@/lib/db', () => ({
	getDb: () => ({}),
	safeQuery: (_fallback: unknown, query: () => Promise<unknown>) => query(),
}))

const slug = 'shen-me-shi-qin-zi-ka-fei-guan-sheng-gai-bo-gu-jia-zhang-cong-kuai-can-zhuan-xiang-you-le-ka-fei-guan-de-5-da-li-you'
const keywords = ['圣盖博谷亲子咖啡馆', '附近室内游乐场']

function makePost(rawKeywords: unknown) {
	// The SDK declares keywords as string[], but its Turso reader returns
	// the JSON TEXT column verbatim. This reproduces the live post's shape.
	return {
		id: 'VJWt3V2cYtvV_HP-DWL0B', slug, language: 'zh',
		title: '什么是亲子咖啡馆？', content: '亲子咖啡馆让家长和孩子一起用餐和玩耍。',
		keywords: rawKeywords, status: 'published',
		createdAt: new Date('2026-09-02T17:08:00.000Z'),
		publishedAt: new Date('2026-09-02T17:08:00.000Z'),
		updatedAt: new Date('2026-09-12T16:48:41.000Z'),
		authorId: null, heroImageUrl: null, seoTitle: null, seoDesc: null,
	} as unknown as NonNullable<Awaited<ReturnType<typeof getBlogPost>>>
}

describe('blog article server rendering', () => {
	beforeEach(() => vi.clearAllMocks())

	it.each([
		['database JSON text', JSON.stringify(keywords), keywords],
		['already decoded keywords', keywords, keywords],
		['missing keywords', null, []],
		['malformed JSON', '[broken', []],
		['non-array JSON', '{"keyword":"play"}', []],
		['mixed JSON values', '["亲子",null,42]', ['亲子']],
	])('renders the article with %s', async (_label, raw, expected) => {
		const post = makePost(raw)
		vi.mocked(getBlogPost).mockResolvedValue(post)
		vi.mocked(getBlogPosts).mockResolvedValue([{ ...makePost(null), slug: 'related-post' }])

		const html = renderToStaticMarkup(await BlogPostPage({ params: Promise.resolve({ locale: 'zh', slug }) }))
		expect(html).toContain('什么是亲子咖啡馆？')
		expect(html).toContain('亲子咖啡馆让家长和孩子一起用餐和玩耍。')
		expect(html).toContain('href="/zh/reservations"')
		expect(html).toContain('href="/zh/blog/related-post"')
		const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1])
		expect(jsonLd.keywords).toBe(expected.length ? expected.join(', ') : undefined)
		expect(jsonLd.inLanguage).toBe('zh')
		expect(post.keywords).toEqual(raw)
	})
})
