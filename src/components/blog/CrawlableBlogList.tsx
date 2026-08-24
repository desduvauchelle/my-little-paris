'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
	BlogCard,
	BlogSearch,
	type BlogListProps,
} from '@growth-engine/sdk-client/components'

const POSTS_PER_PAGE = 9

interface CrawlableBlogListProps extends Omit<BlogListProps, 'localePrefix'> {
	localePrefix: string
	initialPage: number
}

function pageHref(blogPath: string, page: number): string {
	return page === 1 ? blogPath : `${blogPath}?page=${page}`
}

export function CrawlableBlogList({
	posts,
	locale,
	localePrefix,
	translations,
	authors,
	initialPage,
}: CrawlableBlogListProps) {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(initialPage)

	useEffect(() => {
		if (!search) setPage(initialPage)
	}, [initialPage, search])

	const authorMap = useMemo(() => {
		if (!authors) return null
		return new Map(authors.map((author) => [author.id, author]))
	}, [authors])

	const filtered = useMemo(() => {
		if (!search.trim()) return posts
		const query = search.toLowerCase()
		return posts.filter(
			(post) =>
				post.title.toLowerCase().includes(query) ||
				post.seoDesc?.toLowerCase().includes(query),
		)
	}, [posts, search])

	const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
	const currentPage = Math.min(page, Math.max(totalPages, 1))
	const paginated = filtered.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE,
	)
	const blogPath = `${localePrefix}/blog`

	return (
		<section aria-label="Blog posts">
			<BlogSearch
				value={search}
				onChange={(value) => {
					setSearch(value)
					setPage(1)
				}}
				placeholder={translations.searchPlaceholder}
			/>

			{paginated.length === 0 ? (
				<div className="text-center py-16 text-base-content/50">
					<p className="text-lg">{translations.noPostsMessage}</p>
					{search && (
						<button
							type="button"
							onClick={() => setSearch('')}
							className="btn btn-ghost btn-sm mt-2"
						>
							{translations.clearSearchLabel}
						</button>
					)}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{paginated.map((post) => {
						const author = post.authorId ? authorMap?.get(post.authorId) : null
						const cardAuthor = author
							? {
									name: author.name,
									slug: author.slug,
									avatarUrl: author.avatarUrl,
								}
							: null

						return (
							<BlogCard
								key={post.slug}
								{...post}
								locale={locale}
								localePrefix={localePrefix}
								author={cardAuthor}
							/>
						)
					})}
				</div>
			)}

			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					<nav aria-label="Blog pagination" className="join">
						{search ? (
							<button
								type="button"
								className="join-item btn btn-sm"
								disabled={currentPage <= 1}
								onClick={() => setPage(currentPage - 1)}
								aria-label="Previous page"
							>
								«
							</button>
						) : currentPage > 1 ? (
							<Link
								href={pageHref(blogPath, currentPage - 1)}
								className="join-item btn btn-sm"
								aria-label="Previous page"
							>
								«
							</Link>
						) : (
							<span
								className="join-item btn btn-sm btn-disabled"
								aria-hidden="true"
							>
								«
							</span>
						)}

						{Array.from({ length: totalPages }, (_, index) => index + 1).map(
							(pageNumber) =>
								search ? (
									<button
										type="button"
										key={pageNumber}
										className={`join-item btn btn-sm ${pageNumber === currentPage ? 'btn-active' : ''}`}
										onClick={() => setPage(pageNumber)}
										aria-label={`Page ${pageNumber}`}
										aria-current={pageNumber === currentPage ? 'page' : undefined}
									>
										{pageNumber}
									</button>
								) : (
									<Link
										key={pageNumber}
										href={pageHref(blogPath, pageNumber)}
										className={`join-item btn btn-sm ${pageNumber === currentPage ? 'btn-active' : ''}`}
										aria-label={`Page ${pageNumber}`}
										aria-current={pageNumber === currentPage ? 'page' : undefined}
									>
										{pageNumber}
									</Link>
								),
						)}

						{search ? (
							<button
								type="button"
								className="join-item btn btn-sm"
								disabled={currentPage >= totalPages}
								onClick={() => setPage(currentPage + 1)}
								aria-label="Next page"
							>
								»
							</button>
						) : currentPage < totalPages ? (
							<Link
								href={pageHref(blogPath, currentPage + 1)}
								className="join-item btn btn-sm"
								aria-label="Next page"
							>
								»
							</Link>
						) : (
							<span
								className="join-item btn btn-sm btn-disabled"
								aria-hidden="true"
							>
								»
							</span>
						)}
					</nav>
				</div>
			)}
		</section>
	)
}
