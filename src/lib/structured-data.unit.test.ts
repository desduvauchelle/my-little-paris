import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { BUSINESS, LINKS } from '@/data/site'
import { buildUrl } from '@/lib/sitemap-shared'
import {
	buildBreadcrumbJsonLd,
	buildSiteEntityJsonLd,
	serializeJsonLd,
} from './structured-data'

describe('site structured data', () => {
	it('publishes one stable Organization and LocalBusiness entity', () => {
		const schema = buildSiteEntityJsonLd() as Record<string, unknown>

		expect(schema['@context']).toBe('https://schema.org')
		expect(schema['@type']).toEqual(
			expect.arrayContaining(['Organization', 'LocalBusiness', 'CafeOrCoffeeShop']),
		)
		expect(schema).toMatchObject({
			name: BUSINESS.name,
			url: buildUrl(''),
			telephone: '+16266578811',
			email: BUSINESS.email,
			hasMap: LINKS.directions,
			address: {
				'@type': 'PostalAddress',
				streetAddress: BUSINESS.address.street,
				addressLocality: BUSINESS.address.city,
				addressRegion: BUSINESS.address.state,
				postalCode: BUSINESS.address.zip,
				addressCountry: 'US',
			},
		})
		expect(schema.sameAs).toEqual([LINKS.facebook, LINKS.instagram, LINKS.yelp])
	})

	it('builds locale-aware nested breadcrumbs with canonical URLs', () => {
		const schema = buildBreadcrumbJsonLd({
			path: '/blog/authors',
			locale: 'fr',
			homeName: 'Accueil',
			name: 'Auteurs',
			parent: { name: 'Blog', path: '/blog' },
		}) as Record<string, unknown>

		expect(schema).toMatchObject({
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ position: 1, name: 'Accueil', item: buildUrl('', 'fr') },
				{ position: 2, name: 'Blog', item: buildUrl('/blog', 'fr') },
				{ position: 3, name: 'Auteurs', item: buildUrl('/blog/authors', 'fr') },
			],
		})
	})

	it('escapes script-breaking markup in dynamic labels', () => {
		const serialized = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
		expect(serialized).not.toContain('<')
		expect(serialized).toContain('\\u003c/script>')
	})
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const APP = join(__dirname, '..', 'app', '[locale]')
const CORE_PAGE_FILES = [
	'reservations/page.tsx',
	'menu/page.tsx',
	'eat/page.tsx',
	'kidsmenu/page.tsx',
	'drink/page.tsx',
	'play/page.tsx',
	'party/page.tsx',
	'events/page.tsx',
	'gallery/page.tsx',
	'our-story/page.tsx',
	'blog/page.tsx',
	'blog/authors/page.tsx',
	'contact/page.tsx',
] as const

describe('core-page breadcrumb coverage', () => {
	it('renders the permanent site entity from the shared locale layout', () => {
		expect(readFileSync(join(APP, 'layout.tsx'), 'utf8')).toContain('<SiteJsonLd')
	})

	it('renders the shared breadcrumb component on every non-home core page', () => {
		const missing = CORE_PAGE_FILES.filter(
			(file) => !readFileSync(join(APP, file), 'utf8').includes('<BreadcrumbJsonLd'),
		)
		expect(missing).toEqual([])
	})
})
