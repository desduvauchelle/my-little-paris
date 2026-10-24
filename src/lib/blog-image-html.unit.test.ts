import { describe, expect, it } from 'vitest'
import { parseFragment } from 'parse5'
import { optimizeBlogHtml } from './blog-image-html'
import { canOptimizeBlogImage } from './blog-images'
import config from '../../next.config'

const image = 'https://storage.googleapis.com/rs-bucket-prod/tenants/my-little-paris/public/blog-assets/test/graphic.png'

describe('blog image delivery', () => {
	it('retains the SDK cleanup of raw and escaped legacy JSON-LD', () => {
		const script = '<script type="application/ld+json">{"@type":"FAQPage"}</script>'
		const escaped = script.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
		const html = optimizeBlogHtml(`Intro\n\n${script}\n\n${escaped}\n\n\`\`\`html\n${script}\n\`\`\``)
		expect(html).not.toContain('<script')
		expect([...html.matchAll(/FAQPage/g)]).toHaveLength(1)
		expect(html).toContain('<pre><code')
	})
	it('limits remote optimization to this site’s public media', () => {
		expect(canOptimizeBlogImage(image)).toBe(true)
		expect(canOptimizeBlogImage('/images/hero-cafe-play.webp')).toBe(true)
		for (const src of [image.replace('my-little-paris', 'other-tenant'), image.replace('https:', 'http:'), image + '?token=private', '//other.example/image.png', 'data:image/png;base64,abc', '/_next/image?url=x', 'invalid']) {
			expect(canOptimizeBlogImage(src)).toBe(false)
		}
		expect(config.images?.remotePatterns).toEqual([{
			protocol: 'https', hostname: 'storage.googleapis.com',
			pathname: '/rs-bucket-prod/tenants/my-little-paris/public/**', search: '',
		}])
	})

	it('optimizes Markdown and raw HTML while retaining alt, title, dimensions and links', () => {
		const html = optimizeBlogHtml(`![Play & café](${image} "A graphic")\n\n<figure><img src='${image}' alt='Raw graphic' width='600' height='900'><figcaption>Caption</figcaption></figure>\n\n[Book](/reservations)`)
		const fragment = parseFragment(html)
		const images: Record<string, string>[] = []
		function visit(node: typeof fragment.childNodes[number]) {
			if ('tagName' in node && node.tagName === 'img') images.push(Object.fromEntries(node.attrs.map((a) => [a.name, a.value])))
			if ('childNodes' in node) node.childNodes.forEach(visit)
		}
		fragment.childNodes.forEach(visit)
		expect(images).toHaveLength(2)
		for (const attrs of images) {
			expect(attrs.src).toMatch(/^\/_next\/image\?/)
			expect(attrs.srcset).toContain('640w')
			expect(attrs.sizes).toContain('768px')
			expect(attrs.loading).toBe('lazy')
		}
		expect(images[0]).toMatchObject({ alt: 'Play & café', title: 'A graphic' })
		expect(images[1]).toMatchObject({ alt: 'Raw graphic', width: '600', height: '900' })
		expect(html).toContain('<figcaption>Caption</figcaption>')
		expect(html).toContain('href="/reservations"')
	})

	it('keeps external images, code examples and existing optimized URLs intact', () => {
		const content = `<img src="https://example.com/external.jpg" alt="External">\n\n<img src="/_next/image?url=x&amp;w=640&amp;q=75" alt="Existing">\n\n\`![Code](${image})\``
		const once = optimizeBlogHtml(content)
		expect(once).toContain('src="https://example.com/external.jpg"')
		expect(once).toContain('src="/_next/image?url=x&amp;w=640&amp;q=75"')
		expect(once).toContain(`<code>![Code](${image})</code>`)
		expect([...once.matchAll(/<img\b/g)]).toHaveLength(2)
	})
})
