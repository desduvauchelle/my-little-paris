/** Public media owned by this site; keep in sync with next.config.ts. */
export function canOptimizeBlogImage(src: string): boolean {
	if (src.startsWith('/') && !src.startsWith('//') && !src.startsWith('/_next/')) return true
	try {
		const url = new URL(src)
		return url.protocol === 'https:' && url.hostname === 'storage.googleapis.com' &&
			url.pathname.startsWith('/rs-bucket-prod/tenants/my-little-paris/public/') &&
			!url.search && !url.username && !url.password && !url.port
	} catch {
		return false
	}
}

export const BLOG_CARD_SIZES = '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 420px'
export const BLOG_ARTICLE_SIZES = '(max-width: 800px) calc(100vw - 2rem), 768px'
