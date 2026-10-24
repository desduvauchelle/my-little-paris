import { BlogCard } from './BlogCard'
import type { BlogCardProps } from '@growth-engine/sdk-client/components'

export interface RelatedPostsProps {
	posts: Omit<BlogCardProps, 'locale' | 'localePrefix'>[]
	currentSlug: string
	locale: string
	/** Locale URL prefix (`''` for default language, `/fr` otherwise). See BlogCard. */
	localePrefix?: string
	heading: string
}

export function RelatedPosts({ posts, currentSlug, locale, localePrefix, heading }: RelatedPostsProps) {
	const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3)

	if (related.length === 0) return null

	return (
		<aside aria-label="Related posts" className="mt-16">
			<h2 className="text-2xl font-bold mb-6">{heading}</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{related.map((post) => (
					<BlogCard
						key={post.slug}
						{...post}
						locale={locale}
						{...(localePrefix !== undefined ? { localePrefix } : {})}
					/>
				))}
			</div>
		</aside>
	)
}
