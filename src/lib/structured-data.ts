import { defaultLocale } from '@/i18n/config'
import { BUSINESS, LINKS, SERVICE_AREA } from '@/data/site'
import { buildUrl } from '@/lib/sitemap-shared'

export type JsonLdValue =
	| string
	| number
	| boolean
	| null
	| JsonLdValue[]
	| { [key: string]: JsonLdValue }

export interface BreadcrumbParent {
	name: string
	path: string
}

interface BreadcrumbInput {
	path: string
	locale: string
	homeName: string
	name: string
	parent?: BreadcrumbParent
}

/**
 * The permanent business entity rendered on every localized page.
 *
 * Organization and LocalBusiness describe the same real-world entity, so one
 * node carries both types instead of publishing two competing identities.
 * Keep this independent from the CMS: structured data must survive an empty or
 * unavailable content database just like the static address in the footer.
 */
export function buildSiteEntityJsonLd(): JsonLdValue {
	const siteUrl = buildUrl('', defaultLocale)
	const businessId = `${siteUrl}/#business`

	return {
		'@context': 'https://schema.org',
		'@type': [
			'Organization',
			'LocalBusiness',
			'CafeOrCoffeeShop',
			'Restaurant',
			'EntertainmentBusiness',
		],
		'@id': businessId,
		name: BUSINESS.name,
		alternateName: BUSINESS.shortName,
		description: BUSINESS.description,
		url: siteUrl,
		logo: buildUrl('/icon.png', defaultLocale),
		image: buildUrl('/opengraph-image', defaultLocale),
		telephone: BUSINESS.phoneHref.replace('tel:', ''),
		email: BUSINESS.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: BUSINESS.address.street,
			addressLocality: BUSINESS.address.city,
			addressRegion: BUSINESS.address.state,
			postalCode: BUSINESS.address.zip,
			addressCountry: 'US',
		},
		hasMap: LINKS.directions,
		sameAs: [LINKS.facebook, LINKS.instagram, LINKS.yelp],
		areaServed: [
			{ '@type': 'City', name: BUSINESS.address.city },
			{ '@type': 'AdministrativeArea', name: 'San Gabriel Valley' },
			...SERVICE_AREA.map((name) => ({ '@type': 'City', name })),
		],
		servesCuisine: ['French', 'American'],
		currenciesAccepted: 'USD',
		knowsLanguage: ['en', 'fr', 'zh'],
	}
}

/** Build a canonical, locale-aware breadcrumb trail for a visible page. */
export function buildBreadcrumbJsonLd({
	path,
	locale,
	homeName,
	name,
	parent,
}: BreadcrumbInput): JsonLdValue {
	const crumbs = [
		{ name: homeName, path: '' },
		...(parent ? [parent] : []),
		{ name, path },
	]

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: buildUrl(crumb.path, locale),
		})),
	}
}

/** Escape markup-significant characters before embedding JSON in a script. */
export function serializeJsonLd(data: JsonLdValue): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029')
}
