import type { MetadataRoute } from 'next'
import { SITE_NOINDEX } from '@/lib/seo'

const SITE_URL =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:3000')

export default function robots(): MetadataRoute.Robots {
	// Dev/staging: block everything and don't advertise the sitemap.
	if (SITE_NOINDEX) {
		return {
			rules: {
				userAgent: '*',
				disallow: '/',
			},
		}
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	}
}
