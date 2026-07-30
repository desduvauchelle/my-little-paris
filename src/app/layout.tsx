import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { GrowthEngineProvider } from '@growth-engine/sdk-client'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { SITE_URL } from '@/lib/sitemap-shared'
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, SITE_NAME, SITE_NOINDEX } from '@/lib/seo'
import './globals.css'

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
	display: 'swap',
})

const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	style: ['normal', 'italic'],
	display: 'swap',
})

// `metadataBase` makes every relative metadata URL (OG images, etc.) resolve to
// the single canonical host, so absolute asset URLs are never host-inconsistent.
// The `title.default` is only used as a fallback — every page sets its own
// unique title via `buildPageMetadata`.
export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'My Little Paris Café & Play',
		template: '%s | My Little Paris Café & Play',
	},
	description:
		'French café + indoor playground in San Gabriel, CA. Two-hour Eat & Play sessions, all-inclusive birthday parties, memberships, and real food for parents and kids.',
	openGraph: {
		title: SITE_NAME,
		description:
			'French café + indoor playground in San Gabriel, CA. Two-hour Eat & Play sessions, all-inclusive birthday parties, memberships, and real food for parents and kids.',
		siteName: SITE_NAME,
		type: 'website',
		images: [{ url: DEFAULT_OG_IMAGE, alt: DEFAULT_OG_IMAGE_ALT }],
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_NAME,
		description:
			'French café + indoor playground in San Gabriel, CA. Two-hour Eat & Play sessions, all-inclusive birthday parties, memberships, and real food for parents and kids.',
		images: [DEFAULT_OG_IMAGE],
	},
	// Dev/staging kill switch — pages inherit this unless they set their own
	// `robots`, keeping the whole portal out of search until launch.
	...(SITE_NOINDEX && { robots: { index: false, follow: false } }),
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const headersList = await headers()
	const locale = headersList.get('x-locale') || 'en'

	return (
		<html lang={locale} data-theme="light" className={`${dmSans.variable} ${playfair.variable}`}>
			<body className="min-h-screen flex flex-col">
				<GoogleAnalytics />
				<GrowthEngineProvider>
					{children}
				</GrowthEngineProvider>
			</body>
		</html>
	)
}
