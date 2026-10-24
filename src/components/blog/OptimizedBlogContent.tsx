import { BlogContent, type BlogContentProps } from '@growth-engine/sdk-client/components'
import { optimizeBlogHtml } from '@/lib/blog-image-html'

export function OptimizedBlogContent({ html, ...props }: BlogContentProps) {
	return (
		<>
			{/* Retain SDK metadata/JSON-LD from the original post. Render the body
			    separately so the SDK cannot parse the optimized HTML a second time. */}
			<BlogContent {...props} html="" />
			<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: optimizeBlogHtml(html) }} />
		</>
	)
}
