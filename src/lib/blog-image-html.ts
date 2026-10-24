import { marked } from 'marked'
import { getImageProps } from 'next/image'
import { parseFragment, serializeOuter, type DefaultTreeAdapterMap } from 'parse5'
import { BLOG_ARTICLE_SIZES, canOptimizeBlogImage } from './blog-images'

// Match the SDK's legacy JSON-LD cleanup, preserving fenced code examples.
// The SDK still builds the authoritative schema from the unmodified post.
function stripLegacyJsonLd(content: string): string {
	const segments: { fenced: boolean; lines: string[] }[] = []
	let inFence = false
	for (const line of content.split('\n')) {
		const marker = /^\s{0,3}(```|~~~)/.test(line)
		const fenced = inFence || marker
		const last = segments.at(-1)
		if (last?.fenced === fenced) last.lines.push(line)
		else segments.push({ fenced, lines: [line] })
		if (marker) inFence = !inFence
	}
	return segments.map(({ fenced, lines }) => {
		const text = lines.join('\n')
		return fenced ? text : text
			.replace(/<script\b[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script\s*>/gi, '')
			.replace(/&lt;script\b(?:(?!&gt;)[\s\S])*?application\/ld\+json(?:(?!&gt;)[\s\S])*?&gt;[\s\S]*?&lt;\/script\s*&gt;/gi, '')
	}).join('\n')
}

/** Optimize Markdown and HTML images, leaving links, code and other markup intact. */
export function optimizeBlogHtml(content: string): string {
	const html = marked.parse(stripLegacyJsonLd(content), { async: false }) as string
	const fragment = parseFragment(html, { sourceCodeLocationInfo: true })
	const replacements: { start: number; end: number; html: string }[] = []
	function visit(node: DefaultTreeAdapterMap['node']) {
		if ('tagName' in node && node.tagName === 'img') {
			const src = node.attrs.find((attr) => attr.name === 'src')?.value
			const location = node.sourceCodeLocation
			if (src && location && canOptimizeBlogImage(src)) {
				const { props } = getImageProps({ src, alt: '', width: 768, height: 432, sizes: BLOG_ARTICLE_SIZES })
				// Dimensions are unknown for inline graphics: preserve their natural aspect ratio.
				for (const [name, value] of Object.entries({ src: props.src, srcset: props.srcSet, sizes: props.sizes, loading: 'lazy', decoding: 'async' })) {
					if (!value) continue
					const attr = node.attrs.find((attr) => attr.name === name)
					if (attr) attr.value = String(value)
					else node.attrs.push({ name, value: String(value) })
				}
				replacements.push({ start: location.startOffset, end: location.endOffset, html: serializeOuter(node) })
			}
		}
		if ('childNodes' in node) node.childNodes.forEach(visit)
	}
	visit(fragment)
	return replacements.sort((a, b) => b.start - a.start).reduce((result, replacement) =>
		result.slice(0, replacement.start) + replacement.html + result.slice(replacement.end), html)
}
