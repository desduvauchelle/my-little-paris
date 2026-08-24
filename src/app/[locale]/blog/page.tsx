import type { Metadata } from 'next'
import { getBlogPosts, getBlogAuthors } from '@growth-engine/sdk-server'
import { getDictionary } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { parseBlogPage } from '@/lib/blog-pagination'
import { localePrefix } from '@/lib/i18n-utils'
import { buildPageMetadata } from '@/lib/seo'
import { AuthorChips } from '@/components/blog/AuthorChips'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { CrawlableBlogList } from '@/components/blog/CrawlableBlogList'

export const revalidate = 60

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return buildPageMetadata({
		path: '/blog',
		locale,
		title: dict['blog.heading'],
		description: dict['blog.subtitle'],
	})
}

export default async function BlogPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ page?: string | string[] }>
}) {
	const [{ locale }, query] = await Promise.all([params, searchParams])
	const dict = await getDictionary(locale)

	const [posts, authors] = await Promise.all([
		safeQuery([], () => getBlogPosts(getDb(), { locale, limit: 0 })),
		safeQuery([], () => getBlogAuthors(getDb())),
	])

	return (
		<div className="container mx-auto px-4 py-12">
			<BreadcrumbJsonLd path="/blog" locale={locale} homeName={dict['nav.home']} name={dict['nav.blog']} />
			<h1 className="text-4xl font-bold text-center mb-2">{dict['blog.heading']}</h1>
			<p className="text-center text-base-content/70 mb-10">
				{dict['blog.subtitle']}
			</p>

			<AuthorChips
				authors={authors}
				locale={locale}
				label={dict['blog.filter.by.author']}
			/>

			<CrawlableBlogList
				posts={posts}
				locale={locale}
				localePrefix={localePrefix(locale)}
				authors={authors}
				initialPage={parseBlogPage(query.page)}
				translations={{
					noPostsMessage: dict['blog.no.posts'],
					clearSearchLabel: dict['blog.clear.search'],
					searchPlaceholder: dict['blog.search.placeholder'],
				}}
			/>
		</div>
	)
}
