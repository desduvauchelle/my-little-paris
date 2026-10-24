import Image from 'next/image'
import { canOptimizeBlogImage, BLOG_CARD_SIZES } from '@/lib/blog-images'
import { localePrefix as getLocalePrefix } from '@/lib/i18n-utils'
import Link from 'next/link'

import type { BlogCardProps } from '@growth-engine/sdk-client/components'
import { formatDate } from '@/lib/i18n-utils'

// Preserve the SDK card layout, excerpt, author and links.
export function BlogCard({ slug, title, content, heroImageUrl, seoDesc, createdAt, locale, localePrefix, author }: BlogCardProps) {
	const date = formatDate(createdAt, locale)
	const isoDate = new Date(createdAt).toISOString()
	const preview = seoDesc ?? content.replace(/<[^>]*>/g, '').slice(0, 160) + '...'
	const prefix = localePrefix ?? getLocalePrefix(locale)

	return (
		<article itemScope itemType="https://schema.org/BlogPosting">
			<Link href={`${prefix}/blog/${slug}`} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group">
				{heroImageUrl && (
					<figure className="relative aspect-video overflow-hidden">
						<Image
							fill
							sizes={BLOG_CARD_SIZES}
							unoptimized={!canOptimizeBlogImage(heroImageUrl)}
							src={heroImageUrl}
							alt={title}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					</figure>
				)}
				<div className="card-body">
					<time className="text-xs text-base-content/50" dateTime={isoDate}>{date}</time>
					{author && (
						<div className="flex items-center gap-1.5 text-xs text-base-content/60">
							{author.avatarUrl ? (
								<Image
									width={20}
									height={20}
									unoptimized={!canOptimizeBlogImage(author.avatarUrl)}
									src={author.avatarUrl}
									alt=""
									className="w-5 h-5 rounded-full object-cover"
								/>
							) : (
								<span className="w-5 h-5 rounded-full bg-base-300 text-base-content/70 flex items-center justify-center text-[10px] font-semibold">
									{author.name.charAt(0).toUpperCase()}
								</span>
							)}
							<span>{author.name}</span>
						</div>
					)}
					<h2 className="card-title text-lg group-hover:text-primary transition-colors">{title}</h2>
					<p className="text-sm text-base-content/70 line-clamp-3">{preview}</p>
				</div>
			</Link>
		</article>
	)
}
