import type { Metadata } from 'next'
import { getFormBySlug } from '@growth-engine/sdk-server'
import { getDictionary } from '@/i18n'
import { getDb, safeQuery } from '@/lib/db'
import { buildPageMetadata } from '@/lib/seo'
import { ReviewFunnel } from '@/components/review/ReviewFunnel'

const FEEDBACK_FORM_SLUG = 'feedback-form'

export const revalidate = 120

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return {
		...buildPageMetadata({
			path: '/review',
			locale,
			title: dict['review.title'],
			description: dict['review.meta.description'],
		}),
		// Funnel destination for QR codes / receipts / follow-up texts — not
		// a search landing page, so keep it out of the index (and out of
		// STATIC_PAGES in sitemap-shared.ts).
		robots: { index: false, follow: false },
	}
}

export default async function ReviewPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	const form = await safeQuery(null, () => getFormBySlug(getDb(), FEEDBACK_FORM_SLUG))

	return (
		<div className="container mx-auto px-4 py-10 sm:py-16">
			<div className="max-w-md mx-auto">
				<ReviewFunnel dict={dict} form={form} />
			</div>
		</div>
	)
}
